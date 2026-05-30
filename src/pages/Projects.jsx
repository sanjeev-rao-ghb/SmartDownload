
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getPurchasedProjects,
  createOrder,
} from "../api/orderApi";

import {
  downloadProject,
} from "../api/downloadApi";

import {
  createPayment,
} from "../api/paymentApi";

import {
  getAllProjects,
} from "../api/projectApi";

import axios from "../api/axiosConfig";

import {
  getRole,
} from "../utils/auth";

import "../styles/Navbar.css";
import "../styles/Projects.css";

export default function Projects() {

  /* ===== STATES ===== */

  const [projects, setProjects] =
    useState([]);

  const [purchased, setPurchased] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [processingId,
    setProcessingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const role = getRole();

  /* ===== LOAD DATA ===== */

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const data =
        await getAllProjects();

      setProjects(data);

      /* USER PURCHASED */
      if (
        localStorage.getItem("token") &&
        role === "USER"
      ) {

        const purchasedIds =
          await getPurchasedProjects();

        setPurchased(
          purchasedIds
        );
      }

    } catch (err) {

      console.error(
        "Project load failed",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  /* ===== BUY ===== */

  const handleBuy =
    async (project) => {

      try {

        setProcessingId(
          project.projectId
        );

        const order =
          await createOrder(
            project.projectId
          );

        const payment =
          await createPayment(
            order.orderId,
            project.price
          );

        const rzp =
          new window.Razorpay({

            key:
              "rzp_test_RtSn28nuqHWOBM",

            amount:
              payment.amount * 100,

            currency: "INR",

            order_id:
              payment.razorpayOrderId,

            name: "Vendora",

            description:
              project.title,

            handler:
              async function (
                response
              ) {

                try {

                  await axios.post(
                    "/api/payments/verify",
                    {
                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,
                    }
                  );

                  alert(
                    "Payment Successful 🎉"
                  );

                  await loadData();

                } catch (err) {

                  alert(
                    "Payment verification failed"
                  );
                }
              },

            theme: {
              color: "#2563eb",
            },
          });

        rzp.open();

      } catch (err) {

        alert(
          "Please login as USER to buy project"
        );

      } finally {

        setProcessingId(null);
      }
    };

  /* ===== DOWNLOAD ===== */

  const handleDownload =
    async (id) => {

      try {

        const res =
          await downloadProject(id);

        const url =
          window.URL.createObjectURL(
            new Blob([res.data])
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.setAttribute(
          "download",
          "project.zip"
        );

        document.body.appendChild(
          link
        );

        link.click();

      } catch (err) {

        alert(
          "Download failed or not purchased"
        );
      }
    };

  /* ===== SEARCH FILTER ===== */

  const filteredProjects =
    projects.filter((p) =>

      p.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      p.description
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* ===== LOADING ===== */

  if (loading) {

    return (
      <h2>
        Loading projects...
      </h2>
    );
  }

  return (

    <>
      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== PAGE ===== */}
      <div className="page-container">

        <h1>
          Available Projects
        </h1>

        {/* ===== SEARCH ===== */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >

          <input
            type="text"

            placeholder="Search projects..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            style={{
              width: "350px",

              padding: "12px",

              borderRadius: "10px",

              border:
                "1px solid #334155",

              background:
                "#0f172a",

              color: "white",

              outline: "none",
            }}
          />

        </div>

        {/* ===== NO RESULTS ===== */}

        {filteredProjects.length === 0 && (

          <h2
            style={{
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            No projects found
          </h2>

        )}

        {/* ===== GRID ===== */}

        <div className="project-grid">

          {filteredProjects.map((p) => (

            <div
              key={p.projectId}
              className="project-card"
            >

              {/* IMAGE */}

              <img
                src={`https://smartdownload-backend-1.onrender.com/api/projects/image/${p.projectId}`}

                className="project-img"

                alt="project"

                onError={(e) => {
                  e.target.src =
                    "/default.png";
                }}
              />

              {/* TITLE */}

              <h3>
                {p.title}
              </h3>

              {/* DESCRIPTION */}

              <p>
                {p.description}
              </p>

              {/* PRICE */}

              <p className="price">
                ₹{p.price}
              </p>

              {/* ===== ADMIN ===== */}

              {role === "ADMIN" ? (

                <p
                  style={{
                    color: "yellow",
                    marginTop: "10px",
                  }}
                >
                  Admin cannot buy
                  or download
                </p>

              ) : purchased.includes(
                  p.projectId
                ) ? (

                /* ===== DOWNLOAD ===== */

                <button
                  className="download-btn"

                  onClick={() =>
                    handleDownload(
                      p.projectId
                    )
                  }
                >
                  Download
                </button>

              ) : (

                /* ===== BUY ===== */

                <button
                  className="buy-btn"

                  disabled={
                    processingId ===
                    p.projectId
                  }

                  onClick={() =>
                    handleBuy(p)
                  }
                >
                  {processingId ===
                  p.projectId

                    ? "Processing..."

                    : "Buy Now"}
                </button>

              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

