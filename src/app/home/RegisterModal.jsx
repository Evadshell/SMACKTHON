import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from "../../../@/components/ui/dialog";
  import { useState } from 'react';
  import { useSession } from "next-auth/react";

  const RegisterModal = ({ isOpen, onClose, onSubmit }) => {
    const { data: session, status } = useSession();

    const [role, setRole] = useState('patient');
    const [formData, setFormData] = useState({
      name: '',
      dob: '',
      diseases: '',
      experience: '',
      shop: '',
      role: 'patient',
      email:session?.user?.email
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleRoleChange = (newRole) => {
      setRole(newRole);
      setFormData({ ...formData, role: newRole });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="techy-modal">
          <DialogHeader>
            <DialogTitle>Register Your Info</DialogTitle>
            <DialogDescription>Switch between roles and fill in the details</DialogDescription>
          </DialogHeader>
  
          {/* Slider to switch between patient and doctor */}
          <div className="role-switcher">
            <button
              className={`role-button ${role === 'patient' ? 'active' : ''}`}
              onClick={() => handleRoleChange('patient')}
            >
              Patient
            </button>
            <button
              className={`role-button ${role === 'doctor' ? 'active' : ''}`}
              onClick={() => handleRoleChange('doctor')}
            >
              Doctor
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
  
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>
  
            {role === 'patient' && (
              <div className="form-group">
                <label>Diseases</label>
                <input type="text" name="diseases" value={formData.diseases} onChange={handleChange} />
              </div>
            )}
  
            {role === 'doctor' && (
              <>
                <div className="form-group">
                  <label>Experience</label>
                  <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
                </div>
  
                <div className="form-group">
                  <label>Shop</label>
                  <input type="text" name="shop" value={formData.shop} onChange={handleChange} />
                </div>
              </>
            )}
  
            <button type="submit" className="submit-button">Submit</button>
          </form>
  
          <DialogClose asChild>
            <button className="close-button">Close</button>
          </DialogClose>
        </DialogContent>
  
        {/* Custom CSS for techy look */}
        <style jsx>{`
          .techy-modal {
            background: #1f1f1f;
            color: white;
            border-radius: 10px;
            padding: 20px;
          }
  
          .role-switcher {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
          }
  
          .role-button {
            background: #333;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
  
          .role-button.active {
            background: #0a74da;
          }
  
          .form-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
  
          .form-group {
            display: flex;
            flex-direction: column;
          }
  
          .submit-button {
            background-color: #0a74da;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
  
          .submit-button:hover {
            background-color: #084a8f;
          }
  
          .close-button {
            background: transparent;
            border: none;
            color: #0a74da;
            cursor: pointer;
          }
        `}</style>
      </Dialog>
    );
  };
  
  export default RegisterModal;
  