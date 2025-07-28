import Contacts from "./components/Contacts";
import Header from "./components/Header";
import { ContactProvider } from "./context/contactContext.jsx";

function App() {
	return (
		<ContactProvider>
			<Header />
			<Contacts />
		</ContactProvider>
	);
}

export default App;
