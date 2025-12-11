import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jennifer R.",
    text: "Dr. Mitchell is the first doctor who actually took the time to listen to me. She helped me understand my health in ways no one else had before. I've never felt so well cared for.",
    rating: 5,
  },
  {
    name: "Michael T.",
    text: "After years of bouncing between specialists, Dr. Mitchell finally helped me get my diabetes under control. Her holistic approach and genuine concern made all the difference.",
    rating: 5,
  },
  {
    name: "Amanda K.",
    text: "I was nervous about finding a new doctor, but Dr. Mitchell immediately put me at ease. She's thorough, kind, and always available when I need her. Highly recommend!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">
            Patient Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Building trust through compassionate care—hear from the patients whose 
            lives have been touched by our practice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card p-8 rounded-2xl card-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-foreground">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
