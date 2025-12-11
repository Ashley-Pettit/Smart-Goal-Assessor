import { Award, GraduationCap, Heart } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "Education",
    items: [
      "M.D. - Johns Hopkins School of Medicine",
      "Residency - Massachusetts General Hospital",
      "Fellowship - Cleveland Clinic",
    ],
  },
  {
    icon: Award,
    title: "Certifications",
    items: [
      "Board Certified in Internal Medicine",
      "American College of Physicians Fellow",
      "Certified in Lifestyle Medicine",
    ],
  },
  {
    icon: Heart,
    title: "Specializations",
    items: [
      "Preventive Medicine",
      "Chronic Disease Management",
      "Women's Health",
    ],
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wide uppercase text-sm">
                About Dr. Mitchell
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                A Physician Who Truly Listens
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Sarah Mitchell has dedicated her career to providing comprehensive, 
                  patient-centered care that addresses the whole person—body, mind, and spirit. 
                  Her approach combines evidence-based medicine with genuine compassion.
                </p>
                <p>
                  After completing her training at some of the nation's most prestigious 
                  medical institutions, Dr. Mitchell established her practice with a simple 
                  mission: to build lasting relationships with her patients and empower them 
                  to take control of their health.
                </p>
                <p>
                  She believes that the best healthcare outcomes come from true partnerships 
                  between doctors and patients, built on trust, communication, and mutual respect.
                </p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-6">
            {credentials.map((credential, index) => (
              <div
                key={credential.title}
                className="bg-card p-6 rounded-2xl card-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <credential.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-3">
                      {credential.title}
                    </h3>
                    <ul className="space-y-2">
                      {credential.items.map((item) => (
                        <li
                          key={item}
                          className="text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
