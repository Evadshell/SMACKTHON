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

const RegisterModal = ({ isOpen, onClose, onSubmit }) => {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    diseases: '',
    role: 'patient'
    // experience: '',
    // shop: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Your Info</DialogTitle>
          <DialogDescription>Select your role and fill in the details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input type="radio" value="patient" checked={role === 'patient'} onChange={handleRoleChange} />
              Patient
            </label>
            <label>
              <input type="radio" value="doctor" checked={role === 'doctor'} onChange={handleRoleChange} />
              Doctor
            </label>
          </div>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          {role === 'patient' && (
            <div>
              <label>Diseases</label>
              <input type="text" name="diseases" value={formData.diseases} onChange={handleChange} />
            </div>
          )}
          {role === 'doctor' && (
            <>
              <div>
                <label>Experience</label>
                <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
              </div>
              <div>
                <label>Shop</label>
                <input type="text" name="shop" value={formData.shop} onChange={handleChange} />
              </div>
            </>
          )}
          <button type="submit">Submit</button>
        </form>
        <DialogClose asChild>
          <button>Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
