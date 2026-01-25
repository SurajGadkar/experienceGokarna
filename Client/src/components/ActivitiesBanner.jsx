import React from "react";
import { Link } from "react-router-dom";

export default function ActivitiesBanner() {
  return (
    <section className="py-32 relative bg-gradient-to-b from-slate-50/50 to-transparent overflow-hidden flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hero Image Stack */}
          <div className="relative group">
            <div className="beach-card-hero rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700 h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1580713127239-6954a0a33279?w=1200"
                alt="Om Beach Trek"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Image Stats Overlay */}
            <div className="absolute -bottom-12 left-8 lg:left-16 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-72 border z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7m6-3v13" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-800">8km Trek</div>
                  <div className="text-sm text-gray-500">Om to Paradise</div>
                </div>
              </div>
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                3hr
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-teal-800 bg-clip-text text-transparent mb-6 leading-tight">
                Beach Hopping
                <span className="block text-4xl opacity-80">Adventure</span>
              </h2>
              <div className="divider w-24 bg-gradient-to-r from-teal-500 to-blue-500 h-1"></div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Trek between Om, Kudle, Half Moon, and Paradise beaches
                through coastal trails. No vehicles allowed—pure adventure
                with cliff views and hidden coves.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur rounded-2xl hover:bg-white/80 transition-all">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Easy-Moderate</h4>
                    <p className="text-sm text-gray-600">Family-friendly paths</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur rounded-2xl hover:bg-white/80 transition-all">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Sunrise Views</h4>
                    <p className="text-sm text-gray-600">Start at 5:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/treks"
                className="btn-primary px-12 py-6 text-xl shadow-2xl inline-flex items-center gap-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all"
              >
                Start Trekking
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}