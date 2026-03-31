import { motion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import { Mail, Phone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import PageLayout from "@layouts/PageLayout";
import { Loader } from "@components/Loader";

type FormModel = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
};

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const Contact = () => {
  const title = "Liên hệ";
  const sendMutation = useMutation({
    mutationFn: async (variables: FormModel) => {
      return await axios.post(import.meta.env.VITE_WORKER_URL, variables);
    },
    onSettled() {
      toast("🦄 Cảm ơn bạn đã để lại liên hệ.");
    },
    onError() {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    },
  });

  async function formPost(formData: FormData) {
    const turnstileToken =
      (formData?.get("cf-turnstile-response") as string) || undefined;
    const rawFormData: FormModel = {
      name: formData?.get("your-name") as string,
      email: formData?.get("your-email") as string,
      subject: formData?.get("your-subject") as string,
      message: formData?.get("your-message") as string,
      turnstileToken,
    };
    sendMutation.mutate(rawFormData);
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageLayout title={title}>
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-12 not-prose">
            <span className="micro-label text-accent mb-2 block">Contact</span>
            <h1 className="text-7xl lg:text-9xl font-bold tracking-tighter text-display leading-[0.85] italic">
              GET IN<br />TOUCH
            </h1>
            <div className="h-1 w-24 bg-accent mt-8" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <p className="text-xl font-medium leading-relaxed italic text-foreground/80 mb-8">
                Nếu bạn đang tìm kiếm giải pháp về phần mềm, AI, website hay chatbot thông minh, đừng ngần ngại kết nối với tôi để cùng hiện thực hóa những ý tưởng đột phá.
                <br />
                <br />(If you are looking for solutions in software, AI, website or intelligent chatbot, don&apos;t hesitate to connect with me to realize breakthrough ideas together.)
              </p>
              <div className="space-y-6 not-prose">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="micro-label block opacity-40">Email</span>
                    <span className="text-lg font-medium">tuanitpro@gmail.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="micro-label block opacity-40">Phone</span>
                    <span className="text-lg font-medium">097 6060 432</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative p-8 bg-box/30 border border-border/30 rounded-sm">
              <form action={formPost} className="space-y-8">
                <div className="space-y-2">
                  <label className="micro-label opacity-60">Your Name</label>
                  <input
                    required
                    type="text"
                    name="your-name"
                    className="w-full bg-transparent border-b border-border/50 py-2 text-lg outline-none focus:border-accent transition-colors placeholder:text-foreground/20"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="micro-label opacity-60">Email Address</label>
                  <input
                    type="email"
                    name="your-email"
                    required
                    className="w-full bg-transparent border-b border-border/50 py-2 text-lg outline-none focus:border-accent transition-colors placeholder:text-foreground/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="micro-label opacity-60">Message</label>
                  <textarea
                    name="your-message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-border/50 py-2 text-lg outline-none focus:border-accent transition-colors placeholder:text-foreground/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div
                  className="cf-turnstile"
                  data-sitekey="0x4AAAAAACWOggNrwNIc73c4"
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-foreground text-background text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50"
                  disabled={sendMutation?.isPending}
                >
                  {sendMutation?.isPending ? "Sending..." : "Send Message"}
                </motion.button>
              </form>

              {sendMutation?.isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-10">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </article>
        <ToastContainer />
      </PageLayout>
    </motion.div>
  );
};

export default Contact;
