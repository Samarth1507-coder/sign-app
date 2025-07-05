import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Upload from './pages/Upload';
import SignatureUpload from "./pages/SignatureUpload";
import SignaturePlacement from "./pages/SignaturePlacement";
import SignaturePreview from "./pages/SignaturePreview";
import ViewSignatures from "./pages/ViewSignatures";
import PDFViewer from "./pages/PDFViewer"; // ✅ Add this line

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-signature" element={<SignatureUpload />} />
        <Route path="/place-signature/:id" element={<SignaturePlacement />} />
        <Route path="/viewer/:id" element={<PDFViewer />} />
        <Route path="/preview-signature" element={<SignaturePreview />} />
        <Route path="/view-signatures" element={<ViewSignatures />} />
        {/* Add other routes like login/register */}
      </Routes>
    </Router>
  );
}

export default App;
