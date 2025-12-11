import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import doctorPortrait from "@/assets/doctor-portrait.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wide uppercase text-sm">
                Internal Medicine Specialist
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight text-balance">
                Compassionate Care for Your{" "}
                <span className="text-primary">Whole Health</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                With over 15 years of experience, Dr. Sarah Mitchell provides personalized, 
                patient-centered healthcare focused on prevention, wellness, and treating 
                the whole person—not just symptoms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#contact" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule a Visit
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#about">Learn More</a>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Medical Center Drive, Suite 200</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div 
            className="relative flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <img
                src={doctorPortrait}
                alt="Dr. Sarah Mitchell - Internal Medicine Specialist"
                className="relative rounded-2xl shadow-2xl max-w-md w-full object-cover"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl card-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">15+ Years</p>
                    <p className="text-sm text-muted-foreground">of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
