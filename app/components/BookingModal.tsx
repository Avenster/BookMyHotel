import  { useState } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, roomName,images, hotelName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    person1: { name: '', age: '', gender: '' },
    person2: { name: '', age: '', gender: '' },
    checkIn: '',
    checkOut: ''
  });
  
  if (!isOpen) return null;

  const handleInputChange = (person, field, value) => {
    setFormData(prev => ({
      ...prev,
      [person]: { ...prev[person], [field]: value }
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const amenities = ['Free Wi-Fi', 'TV', 'Jaccuzi', 'Balcony'];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[75vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-base font-normal">{hotelName}</span>
            <span className="text-gray-400 text-lg">›</span>
            <span className="text-base font-medium">{roomName}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Section - Image Carousel and Details */}
          <div className="w-[55%] flex flex-col overflow-y-auto">
            <div className="relative h-[300px]">
              <img
                src={images?.[0]}
                alt={`${roomName} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/bed.jpeg';
                }}
              />
              <button 
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {amenities.map(amenity => (
                  <span key={amenity} className="px-3 py-1 rounded-full bg-white text-sm shadow-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{roomName}</h2>
              <p className="text-gray-600">
                Experience luxury in our carefully designed rooms featuring modern amenities and 
                stunning views. Each room comes equipped with high-speed Wi-Fi, a smart TV, and 
                a private balcony.
              </p>
            </div>
          </div>

          {/* Right Section - Booking Form */}
          <div className="w-[45%] border-l overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Date Selection */}
              <div className="space-y-4">
                <div className="flex border rounded-md">
                  <div className="flex-1 p-3 flex items-center border-r">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <input
                      type="text"
                      className="outline-none w-full text-gray-500 placeholder-gray-500"
                      value={formData.checkIn}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      onChange={(e) => setFormData(prev => ({...prev, checkIn: e.target.value}))}
                      placeholder="Check-in"
                    />
                    
                    
                  </div>
                  <div className="flex-1 p-3 flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <input
                      type="text"
                      className="outline-none w-full text-gray-500 placeholder-gray-500"
                      value={formData.checkOut}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      onChange={(e) => setFormData(prev => ({...prev, checkOut: e.target.value}))}
                      placeholder="Check-out"
                    />
                  </div>
                </div>
              </div>

              {/* Person Details */}
              <div className="space-y-6">
                {/* Person 1 */}
                <div>
                  <h3 className="text-sm mb-3">Person 1</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded-md p-2"
                      value={formData.person1.name}
                      onChange={(e) => handleInputChange('person1', 'name', e.target.value)}
                    />
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="Age"
                        className="border rounded-md p-2 w-24"
                        value={formData.person1.age}
                        onChange={(e) => handleInputChange('person1', 'age', e.target.value)}
                      />
                      <div className="flex gap-2 flex-1">
                        <button
                          className={`flex-1 py-2 rounded-md text-sm ${
                            formData.person1.gender === 'male' 
                              ? 'bg-gray-500 text-white' 
                              : 'bg-gray-100'
                          }`}
                          onClick={() => handleInputChange('person1', 'gender', 'male')}
                        >
                          Male
                        </button>
                        <button
                          className={`flex-1 py-2 rounded-md text-sm ${
                            formData.person1.gender === 'female' 
                              ? 'bg-gray-500 text-white' 
                              : 'bg-gray-100'
                          }`}
                          onClick={() => handleInputChange('person1', 'gender', 'female')}
                        >
                          Female
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Person 2 */}
                <div>
                  <h3 className="text-sm mb-3">Person 2</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded-md p-2"
                      value={formData.person2.name}
                      onChange={(e) => handleInputChange('person2', 'name', e.target.value)}
                    />
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="Age"
                        className="border rounded-md p-2 w-24"
                        value={formData.person2.age}
                        onChange={(e) => handleInputChange('person2', 'age', e.target.value)}
                      />
                      <div className="flex gap-2 flex-1">
                        <button
                          className={`flex-1 py-2 rounded-md text-sm ${
                            formData.person2.gender === 'male' 
                              ? 'bg-gray-500 text-white' 
                              : 'bg-gray-100'
                          }`}
                          onClick={() => handleInputChange('person2', 'gender', 'male')}
                        >
                          Male
                        </button>
                        <button
                          className={`flex-1 py-2 rounded-md text-sm ${
                            formData.person2.gender === 'female' 
                              ? 'bg-gray-500 text-white' 
                              : 'bg-gray-100'
                          }`}
                          onClick={() => handleInputChange('person2', 'gender', 'female')}
                        >
                          Female
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Person Link */}
                <div className="flex justify-end">
                  <button className="text-blue-600 text-sm font-medium">+ ADD PERSON</button>
                </div>
              </div>

              {/* Book Button */}
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  console.log('Booking submitted:', formData);
                  onClose();
                }}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;