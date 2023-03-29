import { LANGUAGES } from './constants';
export type LANGUAGEDICTION = {
  language: string;
  question: string;
  note: string;
  buttonyes: string;
  buttonno: string;
};

export const dict = {
  [LANGUAGES.ENGLISH]: {
    language: 'English',
    question: 'Do you want to make  your phone number available to public?',
    note: 'Note : If you click yes, you get calls from your locality for electrical repair works.',
    buttonyes: 'Yes I am an electrician or shop owner',
    buttonno: 'No I am an user',
  },
  [LANGUAGES.MALAYALAM]: {
    language: 'മലയാളം',
    question: 'നിങ്ങളുടെ ഫോൺ നമ്പർ പൊതുജനങ്ങൾക്ക് ലഭ്യമാക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?',
    note: 'Note : നിങ്ങൾ അതെ ക്ലിക്കുചെയ്യുകയാണെങ്കിൽ, ഇലക്ട്രിക്കൽ അറ്റകുറ്റപ്പണികൾക്കായി നിങ്ങളുടെ പ്രദേശത്ത് നിന്ന് കോളുകൾ ലഭിക്കും.',
    buttonyes: 'അതെ, ഞാൻ ഒരു ഇലക്ട്രീഷ്യൻ അല്ലെങ്കിൽ ഷോപ്പ് ഉടമയാണ്',
    buttonno: 'ഇല്ല, ഞാനൊരു ഉപയോക്താവാണ്',
  },
  [LANGUAGES.HINDI]: {
    language: 'हिंदी',
    question: 'क्या आप अपना फ़ोन नंबर जनता के लिए उपलब्ध कराना चाहते हैं?',
    note: 'Note : यदि आप हाँ पर क्लिक करते हैं, तो आपको बिजली की मरम्मत के कामों के लिए अपने इलाके से कॉल आते हैं।',
    buttonyes: 'हाँ मैं एक इलेक्ट्रीशियन या दुकान का मालिक हूँ',
    buttonno: 'नहीं, मैं एक उपयोगकर्ता हूँ',
  },
  [LANGUAGES.TELUGU]: {
    language: 'తెలుగు',
    question: 'మీ ఫోన్ నెంబరును ప్రజలకు అందుబాటులో ఉంచాలనుకుంటున్నారా?',
    note: 'Note : మీరు అవును క్లిక్ చేస్తే, విద్యుత్ మరమ్మతు పనుల కోసం మీ ప్రాంతం నుండి మీకు కాల్స్ వస్తాయి.',
    buttonyes: 'అవును నేను ఎలక్ట్రీషియన్ లేదా షాప్ యజమానిని',
    buttonno: 'లేదు, నేను ఒక వినియోగదారును',
  },
  [LANGUAGES.TAMIL]: {
    language: 'தமிழ்',
    question: 'உங்கள் தொலைபேசி எண்ணை பொதுவில் கிடைக்கச் செய்ய விரும்புகிறீர்களா?',
    note: 'Note : ஆம் என்பதைக் கிளிக் செய்தால், மின் பழுதுபார்க்கும் பணிகளுக்காக உங்கள் பகுதியிலிருந்து அழைப்புகளைப் பெறுவீர்கள்.',
    buttonyes: 'ஆமாம் நான் ஒரு எலக்ட்ரீஷியன் அல்லது கடை உரிமையாளர்',
    buttonno: 'இல்லை நான் ஒரு பயனர்',
  },
  [LANGUAGES.KANNADA]: {
    language: 'ಕನ್ನಡ',
    question: 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಸಾರ್ವಜನಿಕರಿಗೆ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡಲು ನೀವು ಬಯಸುವಿರಾ?',
    note: 'Note :  ನೀವು ಹೌದು ಕ್ಲಿಕ್ ಮಾಡಿದರೆ, ವಿದ್ಯುತ್ ದುರಸ್ತಿ ಕಾರ್ಯಗಳಿಗಾಗಿ ನಿಮ್ಮ ಸ್ಥಳದಿಂದ ನಿಮಗೆ ಕರೆಗಳು ಬರುತ್ತವೆ',
    buttonyes: 'ಹೌದು ನಾನು ಎಲೆಕ್ಟ್ರಿಷಿಯನ್ ಅಥವಾ ಅಂಗಡಿ ಮಾಲೀಕ',
    buttonno: 'ಇಲ್ಲ ನಾನು ಬಳಕೆದಾರ',
  },
  [LANGUAGES.BANGLA]: {
    language: 'বাংলা',
    question: 'আপনি কি আপনার ফোন নম্বরটি জনসাধারণের জন্য উপলব্ধ করতে চান?',
    note: 'Note : আপনি যদি হ্যাঁ ক্লিক করেন তবে আপনি বৈদ্যুতিক মেরামতের কাজের জন্য আপনার এলাকা থেকে কল পাবেন।',
    buttonyes: 'হ্যাঁ আমি একজন ইলেকট্রিশিয়ান বা দোকানের মালিক',
    buttonno: 'না, আমি একজন ব্যবহারকারী',
  },
};
