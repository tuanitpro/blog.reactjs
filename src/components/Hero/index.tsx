import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="min-w-0">
      <h2 className="text-2xl font-bold tracking-tight leading-none">
        <Link to="/" rel="home" className="text-foreground hover:text-foreground/80 transition-colors">
          Tuấn
        </Link>
      </h2>
      <p className="mt-1 text-xs text-foreground/50 leading-snug hidden lg:block">
        Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn
      </p>
    </div>
  );
};

export default Hero;
