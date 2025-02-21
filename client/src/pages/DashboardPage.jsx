import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, Loader, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

export default function Dashboard() {
    const [imageCount, setImageCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);

    const [prompt , setPrompt] = useState("");

    const {credits , setCredits , setUser} = useAuth();

    const handleGenerate = async() => {
        setLoading(true);
        setGeneratedImages([]);
        try {
            const req = await axios.post("/image/generate",{prompt, count:imageCount})
            setGeneratedImages(req.data.images)
            setCredits(req.data.user.credits)
            setUser(req.data.user)
            toast.success("Images are generated")
        } catch (error) {
            setGeneratedImages([])
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col bg-white text-black overflow-hidden md:px-16 lg:px-24">
                {/* Main Content */}
                <main className="flex-1 p-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="md:text-5xl text-3xl font-extrabold drop-shadow-lg">Text-to-Image Generator</h1>
                        <span className="md:text-xl font-semibold mt-3 bg-gray-200 text-blue-700 px-6 py-2 rounded-full shadow-lg">
                            Credits: {credits}
                        </span>
                    </div>

                    {/* Prompt Input */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-xl w-full md:max-w-2xl mb-8 text-gray-900">
                        <textarea
                            value={prompt}
                            onChange={e=>setPrompt(e.target.value)}
                            className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 md:text-lg"
                            placeholder="Enter your prompt here..."
                            rows="3"
                        ></textarea>

                        {/* Image Count Selector */}
                        <div className="mt-6 flex items-center space-x-4">
                            <label className="text-gray-700 text-lg">Number of Images:</label>
                            <select
                                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                value={imageCount}
                                onChange={(e) => setImageCount(Number(e.target.value))}
                            >
                                {[1, 2, 3].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <Button
                            className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center text-lg py-3"
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? <Loader className="animate-spin" size={24} /> : "Generate Image"}
                        </Button>
                    </div>

                    {/* Generated Images Grid */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
                        {loading ? (
                            [...Array(imageCount)].map((_, index) => (
                                <div key={index} className="bg-gray-200 h-64 rounded-lg animate-pulse"></div>
                            ))
                        ) : (
                            generatedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative bg-gray-300 h-64 rounded-lg shadow-xl flex items-center justify-center text-gray-500 group text-lg"
                                >
                                    <img src={image} className="w-full h-full " loading="lazy"/>
                                    <button
                                        className="absolute bottom-3 right-3 p-3 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <a href={image}  download={"image.png"}><Download size={24} /></a>
                                    </button>
                                </div>
                            ))
                        )}
                    </section>
                </main>
            </div>
        </>
    );
}
