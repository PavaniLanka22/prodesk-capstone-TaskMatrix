import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

function PaymentCancel() {

    return (

        <div

            style={{

                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                background: "#f5f7fb"

            }}

        >

            <div

                style={{

                    width: "500px",

                    background: "#fff",

                    borderRadius: "18px",

                    padding: "45px",

                    textAlign: "center",

                    boxShadow: "0 10px 30px rgba(0,0,0,.08)"

                }}

            >

                <XCircle

                    size={70}

                    color="#ef4444"

                />

                <h1

                    style={{

                        marginTop: "20px",

                        color: "#222"

                    }}

                >

                    Payment Cancelled

                </h1>

                <p

                    style={{

                        color: "#666",

                        marginTop: "15px",

                        lineHeight: "28px"

                    }}

                >

                    Your payment was cancelled.

                    <br />

                    No amount has been charged to your account.

                </p>

                <div

                    style={{

                        marginTop: "35px",

                        display: "flex",

                        justifyContent: "center",

                        gap: "15px"

                    }}

                >

                    <Link

                        to="/settings"

                        style={{

                            background: "#5B4CF0",

                            color: "#fff",

                            padding: "14px 24px",

                            borderRadius: "10px",

                            textDecoration: "none",

                            fontWeight: "bold"

                        }}

                    >

                        Try Again

                    </Link>

                    <Link

                        to="/dashboard"

                        style={{

                            background: "#e5e7eb",

                            color: "#111827",

                            padding: "14px 24px",

                            borderRadius: "10px",

                            textDecoration: "none",

                            fontWeight: "bold"

                        }}

                    >

                        Dashboard

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default PaymentCancel;