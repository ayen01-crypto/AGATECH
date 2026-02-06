import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { WhatsAppService, quickWhatsAppActions } from '../utils/whatsapp';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show widget after a delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleWidget = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsExpanded(true), 50);
    }
  };

  const quickActions = [
    {
      title: 'Book a Call',
      description: 'Schedule a consultation',
      action: quickWhatsAppActions.bookCall,
      icon: '📞'
    },
    {
      title: 'Request Quote',
      description: 'Get project pricing',
      action: quickWhatsAppActions.requestQuote,
      icon: '💰'
    },
    {
      title: 'Ask Question',
      description: 'Get quick answers',
      action: quickWhatsAppActions.askQuestion,
      icon: '❓'
    },
    {
      title: 'Place Order',
      description: 'Buy from marketplace',
      action: quickWhatsAppActions.placeOrder,
      icon: '🛒'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Main Widget Button */}
      <button
        onClick={toggleWidget}
        className={`relative w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">4</span>
        </div>
      </button>

      {/* Expanded Menu */}
      {isOpen && (
        <div 
          className={`absolute bottom-20 right-0 w-80 bg-[#05060B] border border-[rgba(0,240,255,0.2)] rounded-xl p-4 shadow-2xl transition-all duration-300 ${
            isExpanded 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-[#F4F6FF] font-semibold">Chat with us</h3>
              <p className="text-[#A7B0C8] text-sm">We're here to help!</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.action();
                  toggleWidget();
                }}
                className="w-full text-left p-3 rounded-lg bg-[#11152B] hover:bg-[#1a1f3a] transition-colors border border-[rgba(0,240,255,0.1)] hover:border-[rgba(0,240,255,0.3)] group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-[#F4F6FF] font-medium group-hover:text-[#00F0FF] transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-[#A7B0C8] text-sm">{action.description}</p>
                  </div>
                  <Send className="w-4 h-4 text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              WhatsAppService.openChat({ type: 'general' });
              toggleWidget();
            }}
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Open WhatsApp Directly
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppWidget;