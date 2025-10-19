import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  const [useFormik, setUseFormik] = useState(false);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Form Handling</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setUseFormik(false)} disabled={!useFormik}>
          Use Controlled Form
        </button>
        <button onClick={() => setUseFormik(true)} disabled={useFormik} style={{ marginLeft: '1rem' }}>
          Use Formik Form
        </button>
      </div>
      {useFormik ? <FormikForm /> : <RegistrationForm />}
    </div>
  );
}

export default App;
