# SmartCart

A modern grocery management application that helps users track their purchases and manage their pantry through smart receipt scanning and inventory management.

## 🌟 Features

- **Smart Receipt Scanning**
  - AWS Textract integration for accurate receipt processing
  - Automatic item and price detection
  - Store name recognition
  - Support for various receipt formats

- **Modern Authentication**
  - Secure user registration and login
  - JWT-based authentication
  - Protected routes and API endpoints

- **User Interface**
  - Clean, modern design using Tailwind CSS
  - Responsive layout for all devices
  - Interactive components with Radix UI
  - Real-time feedback and notifications

## 🛠️ Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - Framer Motion
  - React Hook Form

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - AWS Textract
  - JWT Authentication

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB
- AWS Account (for Textract)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/dnguy36/SmartCart.git
   cd SmartCart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:
   ```
   # JWT Authentication
   JWT_SECRET=your-secret-key-here

   # AWS Configuration
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-aws-region

   # MongoDB Configuration
   MONGODB_URI=your-mongodb-uri
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit `http://localhost:5000`

## 📱 Features in Detail

### Receipt Scanning
- Upload receipts through file upload or camera capture
- Automatic extraction of:
  - Store name
  - Items and prices
  - Total amount
  - Date of purchase
- Support for different store formats

### Authentication
- User registration with email
- Secure login system
- Protected routes and API endpoints
- JWT token management

### User Interface
- Dashboard with key statistics
- Receipt scanning interface
- Pantry management
- Interactive feedback system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

Dat Nguyen - [datnguyen1393@gmail.com](mailto:datnguyen1393@gmail.com)

Project Link: [https://github.com/dnguy36/SmartCart](https://github.com/dnguy36/SmartCart) 