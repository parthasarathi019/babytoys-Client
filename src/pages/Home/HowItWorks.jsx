const HowItWorks = ({ contents }) => {
  return (
    <div className="container my-24 pt-8">
      {/* heading */}
      <h1
        className="text-center text-4xl sm:text-5xl font-extrabold mb-12 font-nunito"
        data-aos="zoom-in"
      >
        Here&rsquo;s how it works
      </h1>

      {/* contents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {contents.map((content) => (
          <div
            key={content._id}
            className="space-y-5 text-center"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <img
              src={content.img}
              alt={content.title}
              className="w-28 mx-auto"
            />
            <h2 className="text-2xl font-extrabold">{content.title}</h2>
            <p className="md:text-lg">{content.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

// {
//   "img": "https://i.ibb.co/zm1Bvzy/icon-1-180x.png",
//   "title": "Nurtures Creativity",
//   "desc": "We believe that creativity is a powerful force in a child's development. Our marketplace showcases toys that encourage imaginative play, artistic expression, and open-ended exploration. From building blocks and craft kits to musical instruments and pretend playsets, we provide a diverse range of options to inspire and nurture creativity."
// }
