export const beaches = [
  { name: 'Om Beach', desc: 'Om-shaped beach for swimming and sunbathing.', img: 'om-beach.jpg' },
  { name: 'Kudle Beach', desc: 'Tranquil spot for yoga and volleyball.', img: 'kudle-beach.jpg' },
  { name: 'Half Moon Beach', desc: 'Secluded crescent beach, boat access only.', img: 'half-moon.jpg' }
];
export const temples = [
  { name: 'Mahabaleshwar Temple', desc: 'Ancient Shiva shrine with Atma Lingam.' },
  { name: 'Maha Ganapati Temple', desc: 'Ganesha temple visited before Shiva shrine.' }
];
export const tips = ['Trek beaches early, carry water. Respect temple customs. Use cash.']

export const activities = {
  "gokarna": {
    "introduction": "Gokarna, a coastal town in Karnataka, India, blends spiritual temples, pristine beaches, trekking trails, and adventure activities. Ideal for serene escapes and thrills.",
    "places": {
      "beaches": [
        {
          "name": "Gokarna Main Beach",
          "description": "Calm waters near the town, ideal for swimming, dolphin spotting, and spiritual vibes close to temples.",
          "activities": ["Swimming", "Dolphin spotting", "Beach walks"],
          "access": "Walkable from Gokarna town",
          "best_time": "October to March"
        },
        {
          "name": "Kudle Beach",
          "description": "Palm-fringed sands 6 km from town, with beach shacks and cafes, known for sunsets.",
          "activities": ["Yoga", "Beach volleyball", "Surfing", "Dining"],
          "access": "Auto-rickshaw or trek from Gokarna Beach",
          "best_time": "November to February"
        },
        {
          "name": "Om Beach",
          "description": "Om-shaped coastline, scenic and less crowded, great for relaxation.",
          "activities": ["Snorkeling", "Scuba diving", "Sunbathing"],
          "access": "Trek from Kudle or boat from Gokarna",
          "best_time": "October to March"
        },
        {
          "name": "Half Moon Beach",
          "description": "Crescent-shaped secluded beach with clear waters.",
          "activities": ["Hiking", "Kayaking", "Snorkeling"],
          "access": "Trek from Om Beach or boat",
          "best_time": "November to February"
        },
        {
          "name": "Paradise Beach",
          "description": "Pristine, isolated gem for ultimate peace, also called Full Moon Beach.",
          "activities": ["Camping", "Fishing", "Bonfires"],
          "access": "Trek from Half Moon or boat (no motorized vehicles)",
          "best_time": "October to March"
        }
      ],
      "temples": [
        {
          "name": "Sri Mahabaleshwara Temple",
          "description": "Revered Shiva temple housing the 6-ft Atmalinga, central pilgrimage site with intricate architecture.",
          "timings": "5 AM - 12 PM, 4 PM - 8 PM",
          "highlights": ["Morning aarti", "Atmalinga darshan"],
          "location": "Dandebagh, Gokarna town"
        },
        {
          "name": "Maha Ganapati Temple",
          "description": "Dedicated to Lord Ganesha with black stone idol; visit before Mahabaleshwara as per tradition.",
          "timings": "6 AM - 12 PM, 5 PM - 9 PM",
          "highlights": ["Blessings for wishes"],
          "location": "Next to Mahabaleshwara Temple"
        },
        {
          "name": "Kotiteertha Temple",
          "description": "Man-made sacred pond with Shiva Lingam, surrounded by temples and coconut groves.",
          "timings": "Open all day",
          "highlights": ["Holy dip", "Spiritual ambiance"],
          "location": "Near Mahabaleshwara Temple"
        },
        {
          "name": "Bhadrakali Temple",
          "description": "Dedicated to Goddess Kali, offering serene meditation space.",
          "timings": "6 AM - 8 PM",
          "highlights": ["Devotional rituals"],
          "location": "Main Road, Gokarna"
        },
        {
          "name": "Rudragaya Harihareshwar Temple",
          "description": "Tranquil Shiva temple for meditation and contemplation.",
          "timings": "5 AM - 12 PM, 4 PM - 8 PM",
          "highlights": ["Peaceful vibes"],
          "location": "Dandebagh"
        }
      ],
      "trekking": [
        {
          "name": "Gokarna Beach Trek",
          "description": "Full coastal trek covering 5 beaches: Gokarna to Paradise (10-12 km, 5-6 hours).",
          "difficulty": "Moderate",
          "highlights": ["Cliff views", "Hidden coves", "Beach hopping"],
          "best_time": "Early morning, October-March"
        },
        {
          "name": "Kudle to Om Beach Trek",
          "description": "Short scenic path (20-30 mins) through forests and rocks.",
          "difficulty": "Easy",
          "highlights": ["Sunrise/sunset views"],
          "best_time": "Anytime dry season"
        },
        {
          "name": "Om to Half Moon/Paradise Trek",
          "description": "Rocky 1-1.5 hour trail with steep sections.",
          "difficulty": "Moderate",
          "highlights": ["Secluded beaches", "Wildlife"],
          "best_time": "November-February"
        },
        {
          "name": "Yana Caves Trek",
          "description": "3-4 hours through forests to limestone caves (50 km from Gokarna).",
          "difficulty": "Moderate-Challenging",
          "highlights": ["Rock formations", "Streams"],
          "best_time": "Post-monsoon"
        }
      ],
      "adventures": [
        {
          "name": "Surfing",
          "description": "Ride waves at Gokarna or Kudle Beach.",
          "location": "Gokarna/Kudle Beaches",
          "cost_estimate": "₹500-1000/session"
        },
        {
          "name": "Scuba Diving/Snorkeling",
          "description": "Explore coral reefs and marine life.",
          "location": "Om/Kudle Beaches",
          "cost_estimate": "₹2000-4000/dive"
        },
        {
          "name": "Banana Boat/Jet Ski",
          "description": "Adrenaline water rides for groups.",
          "location": "Main beaches",
          "cost_estimate": "₹500-800/person"
        },
        {
          "name": "Parasailing",
          "description": "Bird's eye views over the sea.",
          "location": "Kudle Beach",
          "cost_estimate": "₹1000-1500"
        },
        {
          "name": "Beach Camping/Yoga",
          "description": "Overnight stays with bonfires and sessions.",
          "location": "Paradise/Kudle",
          "cost_estimate": "₹1000/night"
        }
      ],
      "other_attractions": [
        {
          "name": "Mirjan Fort",
          "description": "16th-century historic fort with greenery and trekking."
        },
        {
          "name": "Yana Caves",
          "description": "Limestone monoliths for caving and hikes."
        }
      ]
    },
    "tips": {
      "best_season": "October to March",
      "transport": "Bikes on rent (₹400/day), boats for beach hopping",
      "notes": "Carry water for treks; respect no-plastic rules on beaches."
    }
  }
}


export const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      detail: 'gokarnaadventures@gmail.com',
      link: 'mailto:gokarnaadventures@gmail.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      detail: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: '📍',
      title: 'Address',
      detail: 'Om Beach Road, Gokarna, Karnataka 581326',
      link: 'https://maps.google.com/?q=Om+Beach+Road,+Gokarna'
    },
    {
      icon: '🕒',
      title: 'Hours',
      detail: 'Mon-Sun: 8AM - 8PM',
      link: ''
    }
  ];

export const socialLinks = [
    { icon: '📘', label: 'Facebook', href: 'https://facebook.com/gokarnaadventures', color: 'from-blue-600 to-blue-800' },
    { icon: '📷', label: 'Instagram', href: 'https://instagram.com/gokarnaadventures', color: 'from-pink-500 to-purple-600' },
    { icon: '🐦', label: 'X', href: 'https://twitter.com/gokarnaadventures', color: 'from-sky-400 to-blue-500' },
    { icon: '📱', label: 'WhatsApp', href: 'https://wa.me/919876543210', color: 'from-green-500 to-emerald-600' },
    { icon: '📍', label: 'Maps', href: 'https://maps.google.com/?q=Gokarna', color: 'from-red-500 to-orange-500' },
    { icon: '🎥', label: 'YouTube', href: 'https://youtube.com/@gokarnaadventures', color: 'from-red-600 to-red-800' }
  ];

