# 📞 Contact Management Application

A modern, responsive contact management application built with React, featuring form validation, search functionality, and a clean user interface.

## ✨ Features

- **📝 Contact Management**: Add, edit, and delete contacts
- **🔍 Real-time Search**: Search through contacts by name, email, or phone
- **✅ Form Validation**: Comprehensive validation using Yup schemas
- **🎯 Batch Operations**: Select and delete multiple contacts at once
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Modern UI**: Clean and intuitive user interface
- **⚡ Real-time Updates**: Instant feedback and updates

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks
- **React Hook Form** - Form management and validation
- **Yup** - Schema validation
- **CSS Modules** - Scoped styling
- **JSON Server** - Mock API backend
- **Vite** - Fast build tool

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd amirali-malekmohamdi-week16
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the JSON Server (Backend)**

   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactForm.jsx
│   ├── ContactForm.module.css
│   ├── Contactitem.jsx
│   ├── ContactItem.module.css
│   ├── Contacts.jsx
│   ├── Contacts.module.css
│   ├── ContactsList.jsx
│   ├── ContactList.module.css
│   ├── FormInput.jsx
│   ├── FormInput.module.css
│   ├── Header.jsx
│   ├── Header.module.css
│   ├── Modal.jsx
│   ├── Modal.module.css
│   ├── SearchBar.jsx
│   └── SearchBar.module.css
├── context/
│   ├── contactContext.jsx
│   └── contactReducer.js
├── utils/
│   └── validationSchemas.js
├── App.jsx
├── main.jsx
└── global.css
```

## 🎯 Key Components

### ContactForm

A reusable form component that handles:

- Form validation using Yup schemas
- Error display and styling
- Responsive grid layout
- Loading states

### FormInput

A reusable input component featuring:

- Label support
- Error state handling
- Consistent styling
- Accessibility features

### SearchBar

Real-time search functionality with:

- Debounced search
- Validation
- Search icon
- Responsive design

## 🔧 Form Validation

The application uses Yup for comprehensive form validation:

```javascript
const contactSchema = yup.object({
	name: yup.string().required().min(2).max(50),
	lastname: yup.string().required().min(2).max(50),
	email: yup.string().required().email(),
	phone: yup
		.string()
		.required()
		.matches(/^09[0-9]{9}$/),
});
```

## 🎨 Styling

- **CSS Modules**: Scoped styling for components
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional appearance
- **Accessibility**: Proper contrast and focus states

## 📱 Responsive Features

- **Mobile-first design**
- **Touch-friendly interactions**
- **Optimized for all screen sizes**
- **Proper spacing and typography**

## 🔄 State Management

The application uses React Context with useReducer for state management:

- **Contacts**: CRUD operations
- **Search**: Real-time filtering
- **Selection**: Batch operations
- **Editing**: Inline form editing
- **Alerts**: User feedback

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 API Endpoints

The application uses JSON Server with the following endpoints:

- `GET /contacts` - Get all contacts
- `POST /contacts` - Create new contact
- `PUT /contacts/:id` - Update contact
- `DELETE /contacts/:id` - Delete contact

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Amirali Malekmohammadi**

- Email: amirali0110.as@gmail.com
- GitHub: [@amirali-malekmohammadi](https://github.com/amirali-malekmohammadi)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- JSON Server for the mock API
- All contributors and mentors

---

**Built with ❤️ for the Bootcamp project**
