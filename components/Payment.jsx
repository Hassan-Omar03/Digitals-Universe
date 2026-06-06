import { useState } from "react";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { countries } from "country-data";

const DEFAULT_COUNTRY = "AE"; // UAE default

const Payment = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        amount: "",
    });

    const [country, setCountry] = useState(DEFAULT_COUNTRY);
    const [currency, setCurrency] = useState("AED");

    /* -------- Currency symbol helper -------- */
    const getCurrencySymbol = (code) => {
        const symbols = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            INR: "₹",
            PKR: "₨",
            JPY: "¥",
            KRW: "₩",
            AED: "د.إ",
            SAR: "﷼",
            CAD: "C$",
            AUD: "A$",
        };
        return symbols[code] || code;
    };

    /* -------- Handle input change -------- */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            // Format number properly (UAE default)
            const formatted = new AsYouType(DEFAULT_COUNTRY).input(value);
            setFormData((prev) => ({ ...prev, phone: formatted }));

            const phoneNumber = parsePhoneNumberFromString(formatted, DEFAULT_COUNTRY);

            if (phoneNumber?.isValid()) {
                const countryCode = phoneNumber.country;
                setCountry(countryCode);

                const countryData = countries[countryCode];
                if (countryData?.currencies?.length) {
                    setCurrency(countryData.currencies[0]);
                }
            }
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /* -------- Submit payment -------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentData = {
            ...formData,
            country,
            currency,
            timestamp: new Date().toISOString(),
        };

        sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

        try {
            const response = await fetch(
                `/api/checkout?amount=${formData.amount}&currency=${currency.toLowerCase()}`,
                { method: "GET" }
            );

            if (!response.ok) {
                // Try to parse error message from response
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || "Failed to create checkout session";
                throw new Error(errorMessage);
            }

            const session = await response.json();

            // Validate session has a URL before redirecting
            if (!session.url) {
                throw new Error("Invalid checkout session received");
            }

            window.location.href = session.url;

        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed: " + error.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center p-5 md:p-7 rounded-[22px]"
        >
            <h2 className="du-split-heading text-2xl font-black text-white mb-7 text-center">
                Payment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8bbef0] mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-[14px] bg-white/[0.07] border border-white/15 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#8bbef0]/60 focus:bg-white/[0.10]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8bbef0] mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-[14px] bg-white/[0.07] border border-white/15 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#8bbef0]/60 focus:bg-white/[0.10]"
                            required
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8bbef0] mb-2">
                            Phone Number ({country})
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+971 50 123 4567"
                            className="w-full px-4 py-3 rounded-[14px] bg-white/[0.07] border border-white/15 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#8bbef0]/60 focus:bg-white/[0.10]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8bbef0] mb-2">
                            Amount ({currency})
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                                {getCurrencySymbol(currency)}
                            </span>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-white/[0.07] border border-white/15 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#8bbef0]/60 focus:bg-white/[0.10]"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Button */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="du-action-primary mt-8 py-4 px-10 font-bold rounded-[16px] text-white"
                >
                    Pay Now
                </button>
            </div>
        </form>
    );
};

export default Payment;
