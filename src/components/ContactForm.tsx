import React, { useState } from 'react';
import { X, Check, Loader2, Send } from 'lucide-react';

interface ContactFormProps {
  onClose: () => void;
  darkMode: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    userType: 'student',
    phone: '',
    email: '',
    college: '',
    branch: '',
    year: '',
    company: '',
    role: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.message.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio' && name === 'userType') {
      setFormData(prev => ({
        ...prev,
        userType: value,
        college: '',
        branch: '',
        year: '',
        company: '',
        role: '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form and close after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          userType: 'student',
          phone: '',
          email: '',
          college: '',
          branch: '',
          year: '',
          company: '',
          role: '',
          message: '',
        });
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  const inputBaseClasses = `w-full px-4 py-2 rounded-lg border text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500`;
  const inputThemeClasses = darkMode 
    ? 'bg-gray-800/80 border-gray-700 text-white placeholder-gray-400' 
    : 'bg-white/80 border-gray-300 text-black placeholder-gray-500';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center sm:justify-end z-50 p-4">
      <div className={`w-full max-w-sm rounded-2xl p-0.5 shadow-2xl bg-gradient-to-r from-orange-400 via-red-500 to-orange-500 animate-border-spin ${isSubmitted ? 'animate-fade-in' : 'animate-slide-in-right'}`}>
        <div className={`w-full h-full rounded-[14px] p-5 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors z-10">
            <X size={22} />
          </button>
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="mx-auto bg-green-500/20 rounded-full h-12 w-12 flex items-center justify-center mb-3">
                <Check className="text-green-400 h-6 w-6" />
              </div>
              <h2 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>Message Sent!</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xs`}>Thanks for reaching out. My creator will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 className={`text-xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent`}>Send a Message</h2>
              <div className="space-y-3">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} required />
                
                <div className="flex items-center justify-center space-x-6 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="userType" value="student" checked={formData.userType === 'student'} onChange={handleChange} className="hidden" />
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.userType === 'student' ? 'border-orange-500' : 'border-gray-500'}`}>
                      {formData.userType === 'student' && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                    </span>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>College Student</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="userType" value="professional" checked={formData.userType === 'professional'} onChange={handleChange} className="hidden" />
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.userType === 'professional' ? 'border-orange-500' : 'border-gray-500'}`}>
                      {formData.userType === 'professional' && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                    </span>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Professional</span>
                  </label>
                </div>

                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} />
                <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} required />
                
                {formData.userType === 'student' && (
                  <>
                    <input type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} />
                    <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} />
                    <input type="text" name="year" placeholder="Year of Study" value={formData.year} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} />
                  </>
                )}
                {formData.userType === 'professional' && (
                  <>
                    <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} />
                    <input type="text" name="role" placeholder="Your Role" value={formData.role} onChange={handleChange} className={`${inputBaseClasses} ${inputThemeClasses}`} />
                  </>
                )}

                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={3} className={`${inputBaseClasses} ${inputThemeClasses}`} required></textarea>
                <button type="submit" disabled={!isFormValid || isSubmitting} className={`w-full font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-base ${darkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'} ${isSubmitting || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : <Send className="mr-2" size={18} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 