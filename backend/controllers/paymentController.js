const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {

    try {

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],

            mode: "payment",

            line_items: [

                {

                    price_data: {

                        currency: "usd",

                        product_data: {

                            name: "TaskMatrix Pro",

                            description: "Upgrade to Pro Plan"

                        },

                        unit_amount: 999

                    },

                    quantity: 1

                }

            ],

            success_url: `${process.env.CLIENT_URL}/payment-success`,

            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`

        });

        res.status(200).json({

            success: true,

            url: session.url

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createCheckoutSession

};