import { useState } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.zip) newErrors.zip = "ZIP code is required";
        if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
        if (!formData.expiry) newErrors.expiry = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsProcessing(true);

        // Mock payment processing
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            toast.success("Order placed successfully!");
            navigate("/");
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="w-full min-h-screen bg-background">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
                    <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate("/shop")}
                        className="text-accent hover:underline"
                    >
                        Go back to shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-background">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Shipping Info */}
                            <div className="bg-surface p-8 rounded-xl shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold text-primary mb-6">Shipping Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.firstName ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.lastName ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.email ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.address ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.city ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.zip ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-surface p-8 rounded-xl shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold text-primary mb-6">Payment Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="0000 0000 0000 0000"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.cardNumber ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.expiry ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none ${errors.cvv ? "border-red-500" : "border-slate-200"}`}
                                        />
                                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 ${isProcessing ? "opacity-70 cursor-wait" : ""}`}
                            >
                                {isProcessing ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-surface p-8 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white p-1 rounded border border-slate-100" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-primary line-clamp-2">{item.title}</h4>
                                            <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-px bg-slate-100 my-4" />
                            <div className="flex justify-between text-lg font-bold text-primary">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
