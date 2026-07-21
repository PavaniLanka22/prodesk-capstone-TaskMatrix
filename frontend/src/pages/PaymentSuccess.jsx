import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {

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

                <CheckCircle

                    size={70}

                    color="#16a34a"

                />

                <h1

                    style={{

                        marginTop: "20px",

                        color: "#222"

                    }}

                >

                    Payment Successful 🎉

                </h1>

                <p

                    style={{

                        color: "#666",

                        marginTop: "15px",

                        lineHeight: "28px"

                    }}

                >

                    Thank you for upgrading to

                    <b> TaskMatrix Pro</b>.

                    <br />

                    Your payment has been processed successfully.

                </p>

                <Link

                    to="/dashboard"

                    style={{

                        display: "inline-block",

                        marginTop: "35px",

                        background: "#5B4CF0",

                        color: "#fff",

                        padding: "14px 28px",

                        borderRadius: "10px",

                        textDecoration: "none",

                        fontWeight: "bold"

                    }}

                >

                    Go to Dashboard

                </Link>

            </div>

        </div>

    );

}

export default PaymentSuccess;