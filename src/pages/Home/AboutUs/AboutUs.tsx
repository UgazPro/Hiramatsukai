import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function AboutUs() {

    const navigate = useNavigate();

    return (
        <section id="home" className="relative w-full min-h-[77vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 -top-1/2">
                    <img
                        src="/Hiramatsukai.jpg"
                        alt="Karate training"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            
            <div className="relative w-full flex items-center justify-center">
                <div className="max-w-2xl text-center text-white px-4">
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Hiramatsukai
                    </h1>

                    <p className="text-xl md:text-2xl mb-10 text-gray-100">
                        Tradición, disciplina y excelencia en las artes marciales
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-base"
                            style={{ fontFamily: "Kavoon" }}
                        >
                            Comienza tu viaje
                        </Button>

                        <Button
                            onClick={() => navigate('/about-us')}
                            size="lg"
                            variant="clickRed"
                            className="border-2 border-white text-white hover:bg-gray-500 px-8 py-6 text-base"
                            style={{ fontFamily: "Kavoon" }}
                        >
                            Conócenos
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
