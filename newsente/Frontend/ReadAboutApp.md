src
├── Routers
│   └── router.jsx                   // Main routing configuration
├── assets                           // Static images for different pages
│   ├── Aboutus_images
│   ├── Ar-Ge_images
│   ├── Contactus_images
│   ├── Main_images
│   ├── Services_images
│   ├── Siparis_images
│   └── Slider_images
├── components                       // Shared reusable components
│   ├── Error404
│   │   ├── Error404.jsx             // 404 Error page component
│   │   └── Error404.module.css      // CSS module for Error404 component
│   ├── HomeComponent                // Components related to the home page
│   │   ├── Footer
│   │   │   ├── Footer.jsx           // Footer component
│   │   │   └── Footer.module.css    // CSS module for Footer
│   │   ├── Login
│   │   │   ├── Login.jsx            // Login component
│   │   │   └── Login.module.css     // CSS module for Login
│   │   ├── Navbar
│   │   │   ├── Navbar.jsx           // Navbar component
│   │   │   └── Navbar.module.css    // CSS module for Navbar
│   │   ├── Register
│   │   │   ├── Register.jsx         // Register component
│   │   │   └── Register.module.css  // CSS module for Register
│   │   └── Slider
│   │       ├── Slider.jsx           // Slider component
│   │       └── Slider.module.css    // CSS module for Slider
│   ├── OrderComponent
│   │   ├── AdminComponent
│   │   │   ├── AdminSideBar.jsx     // Sidebar for Admin
│   │   │   ├── AdminSideBar.module.css  // CSS module for AdminSideBar
│   │   │   ├── AdminTables.jsx      // Tables for Admin
│   │   │   └── AdminTables.module.css   // CSS module for AdminTables
│   │   ├── UserComponent
│   │   │   ├── UserSideBar.jsx      // Sidebar for User
│   │   │   ├── UserSideBar.module.css   // CSS module for UserSideBar
│   │   │   ├── UserTables.jsx       // Tables for User
│   │   │   └── UserTables.module.css    // CSS module for UserTables
│   └── ...other Order components    // Other components for orders with their respective .module.css files
├── pages                            // Organized pages for routing
│   ├── About
│   │   ├── About.jsx                // About page component
│   │   └── About.module.css         // CSS module for About page
│   ├── Ar_Ge
│   │   ├── Ar_Ge.jsx                // Ar-Ge page component
│   │   └── Ar_Ge.module.css         // CSS module for Ar-Ge page
│   ├── Contact
│   │   ├── Contact.jsx              // Contact page component
│   │   └── Contact.module.css       // CSS module for Contact page
│   ├── Covid_19
│   │   ├── Covid_19.jsx             // Covid-19 page component
│   │   └── Covid_19.module.css      // CSS module for Covid-19 page
│   ├── LoginPage
│   │   ├── LoginPage.jsx            // Login page component
│   │   └── LoginPage.module.css     // CSS module for Login page
│   ├── Main
│   │   ├── Main.jsx                 // Main page component
│   │   └── Main.module.css          // CSS module for Main page
│   ├── RegisterPage
│   │   ├── RegisterPage.jsx         // Register page component
│   │   └── RegisterPage.module.css  // CSS module for Register page
│   └── Services
│       ├── Services.jsx             // Services page component
│       └── Services.module.css      // CSS module for Services page
├── zustand                          // State management folder (if using Zustand)
├── App.css                          // Main styling file for global styles
├── App.jsx                           // Main app component
├── index.css                        // General CSS
├── index.jsx                        // Root index file for React
└── main.jsx                         // Root main file for React

