import React from "react";
const Landingpage = () => {
    return (
        <div>
            {/* <img src="https://i.pinimg.com/736x/32/45/56/3245561b22e3613249e747c7cca48bd3.jpg" alt="background image for landing page" width="100%" height="100%" style={{ objectFit: "cover" }} /> */}


            <div>
                <header className="text-white text-center bg-dark py-5" style={{ background: 'linear-gradient(135deg, #1f4037, #99f2c8)', height: '80vh' }}>
                    <h1 className="display-3 fw-bold">Welcome to Your Project</h1>
                    <p className="lead">Transform your ideas into reality with our platform.</p>
                    <button className="btn btn-outline-light btn-lg mt-4">Explore Now</button>
                </header>

            </div>
        </div>
    )
}
export default Landingpage