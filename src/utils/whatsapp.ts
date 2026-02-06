export const WhatsAppService = {
  openChat: ({ type, phone, message }: { type?: string; phone?: string; message?: string } = {}) => {
    const number = phone ?? '256773826874';
    const defaultMessage =
      type === 'bookCall'
        ? 'Hi, I would like to book a call.'
        : type === 'requestQuote'
        ? 'Hi, I would like a quote for a project.'
        : type === 'placeOrder'
        ? 'I would like to place an order.'
        : 'Hello, I have a question.';
    const text = encodeURIComponent(message ?? defaultMessage);
    const url = `https://wa.me/${number}?text=${text}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  },
};

export const quickWhatsAppActions = {
  bookCall: () => WhatsAppService.openChat({ type: 'bookCall' }),
  requestQuote: () => WhatsAppService.openChat({ type: 'requestQuote' }),
  askQuestion: () => WhatsAppService.openChat({ type: 'askQuestion' }),
  placeOrder: () => WhatsAppService.openChat({ type: 'placeOrder' }),
};

export default WhatsAppService;
