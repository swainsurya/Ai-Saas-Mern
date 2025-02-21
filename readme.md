# Text-to-Image Generator Web App

<img src="https://res.cloudinary.com/di53fuwst/image/upload/v1740152623/Screenshot_2025-02-21_211030_yursnt.png">

## 📌 Overview

The **Text-to-Image Generator Web App** is a SaaS-based platform that allows users to generate AI-powered images from text prompts. Built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, styled with **Tailwind CSS** and **ShadCN**, and powered by the **Hugging Face API**, this application provides an intuitive user experience for generating high-quality AI-generated images.

## 🚀 Features

- 🔐 **User Authentication** (Login/Signup)
- 📝 **Text Prompt Input** for generating images
- 📷 **Image Generation using Hugging Face API**
- 📂 **Download Images** on hover
- 🎨 **Grid Display** of generated images
- 📊 **User Credits System**
- 💳 **Stripe Payment Integration**
- ⚡ **Fully Responsive UI**
- ⏳ **Loading State with Skeleton UI**
- ❓ **FAQ Section**

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, ShadCN
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payment:** Stripe API
- **AI Model:** Hugging Face API for image generation

## 📌 Installation Guide

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repo/text-to-image-generator.git
cd text-to-image-generator
```

### **2️⃣ Install Dependencies**

#### **Frontend**

```bash
cd client
npm install
```

#### **Backend**

```bash
cd server
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in both the `client` and `server` directories and add your configuration.

#### **Backend (**``**)**

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_KEY=your_huggingface_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### **Frontend (**``**)**

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### **4️⃣ Start the Application**

#### **Run Backend**

```bash
cd server
npm start
```

#### **Run Frontend**

```bash
cd client
npm start
```

The app will be available at `https://aimaginify.onrender.com`

## 📷 API Endpoints

### **1️⃣ User Authentication**

- `POST /api/register` → Register a new user
- `POST /api/login` → Login user
- `GET /api/user` → Get current user details

### **2️⃣ Image Generation**

- `POST /api/generate` → Generate images based on text prompt

### **3️⃣ Payment & Credits**

- `POST /api/payment` → Handle Stripe payments
- `GET /api/credits` → Check remaining user credits

## 📜 License

This project is **MIT Licensed**.

## 🌟 Acknowledgments

- **Hugging Face** for AI image generation
- **Stripe** for payment processing
- **MERN Stack** for full-stack development
- **ShadCN & TailwindCSS** for modern UI styling

## 🙌 Contributing

Feel free to **fork**, **create a pull request**, or **open an issue** to contribute!

---

**💡 Developed by [Your Name]** 🚀

Suryakanta Swain
