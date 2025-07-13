import React from "react";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carousel1 from "../../../src/img/carousel-1.jpg";
import carousel2 from "../../../src/img/carousel-2.jpg";
import carousel3 from "../../../src/img/carousel-3.jpg";
import team from "../../../src/img/team-2.jpg";
import { Check, ChevronUp } from 'lucide-react';
const Homenext = () => {
  const carouselData = [
    { img: carousel1, subtitle: "Car Washing", title: "Keep your Car Newer" },
    { img: carousel2, subtitle: "Car Washing", title: "Quality service for you" },
    { img: carousel3, subtitle: "Car Washing", title: "Exterior & Interior Washing" },
  ];

  const services = [
    { label: "Outside Only", cid: 1 },
    { label: "Inside & Out", cid: 2 },
    { label: "Premium Wash", cid: 3 },
    { label: "Mini Detail", cid: 4 },
    { label: "Interior Detail", cid: 5 },
    { label: "Full Detail", cid: 6 },
    { label: "Ultra Premium Finishes", link: "ultra_premium_finishes.php" },
    { label: "Extras", link: "extras.php" },
  ];

//   const plans = [
//     {
//       title: "OUTSIDE ONLY",
//       price: "35*",
//       link: "services.php?cid=1",
//       features: [
//         "Wash & Chamois Dry",
//         "Exterior Windows",
//         "Wheels Clean & Tyres Gloss",
//         "Spray-On Wax",
//       ],
//     },
//     {
//       title: "INSIDE & OUT",
//       price: "55*",
//       link: "services.php?cid=2",
//       features: [
//         "Includes Outside Only",
//         "Interior Wiped & Dusted",
//         "Interior & Boot Vacuumed",
//         "Windows Clean Inside & Out",
//       ],
//     },
//     {
//       title: "Premium Wash",
//       price: "95*",
//       link: "services.php?cid=3",
//       features: [
//         "Include Inside & Out clean",
//         "Dash & Console Detailed with all plastic trims",
//         "Eternal Plastic Trims Rejuvenation",
//         "Hand Wax & Polish",
//         "Seats Wiped & Spot Clean",
//       ],
//     },
//   ];

  const service = [
    {
      id: 1,
      title: "Ceramic Coating",
      price: "From $199* onwards",
      image: team,
      buttonStyle: "black",
    },
    {
      id: 2,
      title: "Interior Protection Pack",
      price: "From $299* onwards",
      image: team,
      buttonStyle: "white",
    },
    {
      id: 3,
      title: "Windows Tinting",
      price: "From $499* onwards",
      image: team,
      buttonStyle: "black",
    },
    {
      id: 4,
      title: "Stage 3 Paint Correction",
      price: "From $399* onwards",
      image: team,
      buttonStyle: "black",
    },
  ];

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
const plans = [
    {
      id: 1,
      name: "MINI DETAIL",
      price: "149",
      features: [
        "Includes Premium Wash",
        "Clay Block Treatment(Paint Cleansing)",
        "Interior Trims Detailed & Protection",
        "Leather Clean & Condition (Fabric Seats Steam Clean)",
        "Floor Mats Steam Clean"
      ],
      buttonStyle: "black",
      popular: false
    },
    {
      id: 2,
      name: "INTERIOR DETAIL",
      price: "199",
      features: [
        "Includes Mini Detail",
        "Carpets Steam Clean",
        "Roof Lining Steam Clean",
        "Odour Eliminated Treatment"
      ],
      buttonStyle: "white",
      popular: true
    },
    {
      id: 3,
      name: "FULL DETAIL",
      price: "349",
      features: [
        "Include Interior Detail",
        "Engine Bay Degreased",
        "Buff & Polish(Correct Minor Scratches)"
      ],
      buttonStyle: "black",
      popular: false
    }
  ];

  return (
    <div className="text-white">
    
      <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
    
          <div className="text-center mb-16">
            <h2 className="text-orange-400 text-sm font-semibold tracking-wider uppercase mb-4">
              HAVE A LOOK AT OUR PREMIUM SERVICES
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold">
              Long Lasting Services For Your Car
            </h1>
          </div>

   
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition"
              >
            
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

              
                <div className="p-4 bg-orange-500 text-white flex flex-col items-start justify-between h-full">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm mb-4">{item.price}</p>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      item.buttonStyle === "black"
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore All Services
            </button>
          </div>
        </div>
      </div>
 <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-16">
          <h2 className="text-orange-400 text-sm font-semibold tracking-wider uppercase mb-4">
            DETAILING SERVICES
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
            Choose Your Plan
          </h1>
        </div>

 
        <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-3xl p-1 shadow-2xl">
          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl p-8 lg:p-10 min-h-[600px] lg:min-h-[650px] flex flex-col transform hover:scale-105 transition-all duration-300 ${
                    plan.popular ? 'ring-4 ring-white/20 lg:scale-105' : ''
                  }`}
                >
             
                  <div className="text-center mb-8">
                    <h3 className="text-white font-bold text-lg lg:text-xl mb-4 tracking-wide">
                      {plan.name}
                    </h3>
                    
                
                    <div className="mb-2">
                      <span className="text-white text-5xl lg:text-6xl font-bold">
                        ${plan.price}
                      </span>
                      <span className="text-white text-3xl lg:text-4xl font-bold">*</span>
                    </div>
                    
               
                    <p className="text-white/90 text-sm italic">
                      *price depends on the model
                    </p>
                  </div>

                  <div className="space-y-5 mb-10 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-orange-500" />
                          </div>
                        </div>
                        <span className="text-white text-sm lg:text-base leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

           
                  <div className="text-center">
                    <button
                      className={`px-8 py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        plan.buttonStyle === 'black'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-white text-black hover:bg-gray-100'
                      }`}
                    >
                      Book Now
                    </button>
                  </div>

     
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white text-orange-500 px-4 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>
    </div>

   <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
     
        <div className="text-center mb-16">
          <h2 className="text-orange-400 text-sm font-semibold tracking-wider uppercase mb-4">
            DETAILING SERVICES
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
            Choose Your Plan
          </h1>
        </div>

       
        <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-3xl p-1 shadow-2xl">
          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl p-8 lg:p-10 min-h-[600px] lg:min-h-[650px] flex flex-col transform hover:scale-105 transition-all duration-300 ${
                    plan.popular ? 'ring-4 ring-white/20 lg:scale-105' : ''
                  }`}
                >
              
                  <div className="text-center mb-8">
                    <h3 className="text-white font-bold text-lg lg:text-xl mb-4 tracking-wide">
                      {plan.name}
                    </h3>
                    
                
                    <div className="mb-2">
                      <span className="text-white text-5xl lg:text-6xl font-bold">
                        ${plan.price}
                      </span>
                      <span className="text-white text-3xl lg:text-4xl font-bold">*</span>
                    </div>
                    
            
                    <p className="text-white/90 text-sm italic">
                      *price depends on the model
                    </p>
                  </div>

            
                  <div className="space-y-5 mb-10 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-orange-500" />
                          </div>
                        </div>
                        <span className="text-white text-sm lg:text-base leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

        
                  <div className="text-center">
                    <button
                      className={`px-8 py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        plan.buttonStyle === 'black'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-white text-black hover:bg-gray-100'
                      }`}
                    >
                      Book Now
                    </button>
                  </div>

               
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white text-orange-500 px-4 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Homenext;
