// @ts-ignore
import { statsData } from "./statsData";

const StatsCards = () => {
  return (
    <section className="flex flex-col justify-center items-center my-12">
      <h1 className="text-5xl text-primary font-museo text-center pt-12">
        Our Impact
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-10/12 mx-auto text-center py-12">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`p-6 bg-gradient-to-r ${stat.gradient} rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300`}
          >
            <stat.icon className={`${stat.color} text-5xl mx-auto mb-4`} />{" "}
            <p className={`text-5xl font-extrabold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-md text-gray-500 mt-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
