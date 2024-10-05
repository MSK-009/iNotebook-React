import React from 'react'

const Footer = () => {
  return (
<footer className="bg-primary-subtle text-dark py-4 mt-5">
  <div className="container">
    <div className="row">

      <div className="col-md-4">
        <h5>Company Name</h5>
        <p>123 Street Name, City, Country</p>
        <p>Email: info@company.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
      
      <div className="col-md-4">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/" className="text-dark">Home</a></li>
          <li><a href="/" className="text-dark">About Us</a></li>
          <li><a href="/" className="text-dark">Services</a></li>
          <li><a href="/" className="text-dark">Contact</a></li>
        </ul>
      </div>
      
      <div className="col-md-4">
        <h5>Follow Us</h5>
        <a href="/" className="text-dark me-3"><i className="fab fa-facebook-f"></i></a>
        <a href="/" className="text-dark me-3"><i className="fab fa-twitter"></i></a>
        <a href="/" className="text-dark me-3"><i className="fab fa-instagram"></i></a>
        <a href="/" className="text-dark"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col text-center">
        <p className="mb-0">&copy; 2024 Company Name. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer
