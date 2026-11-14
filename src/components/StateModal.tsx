import React, { useState } from 'react';
import { INDIAN_STATES, type StateInfo } from '../utils/stateDetection';
import { XIcon, SearchIcon, CheckIcon, MapPinIcon } from './Icons';

interface StateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedState: string;
  onSelectState: (stateName: string) => void;
}

export const StateModal: React.FC<StateModalProps> = ({
  isOpen,
  onClose,
  selectedState,
  onSelectState,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredStates = INDIAN_STATES.filter((s: StateInfo) =>
    s.name.toLowerCase().includes(normalizedSearch) ||
    s.code.toLowerCase().includes(normalizedSearch) ||
    (s.capital && s.capital.toLowerCase().includes(normalizedSearch))
  );

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="animate-slide-up bg-white rounded-3xl w-full max-w-[680px] max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0445DA] flex items-center justify-center shrink-0">
              <MapPinIcon size={20} />
            </div>
            <div>
              <h2 className="text-[2rem] font-black text-gray-950 leading-tight">
                Choose your State
              </h2>
              <p className="text-[1.25rem] text-gray-500 mt-0.5">
                Select your operating state to view live partner benefits &amp; fleet earnings
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors cursor-pointer border-none"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 pb-2 border-b border-gray-100">
          <div className="relative flex items-center">
            <SearchIcon size={18} className="absolute left-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search state (e.g. Punjab, Maharashtra, Delhi...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-[1.45rem] font-semibold text-gray-950 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-[#0445DA] focus:ring-2 focus:ring-[#0445DA]/15 transition-all"
            />
          </div>
        </div>

        {/* States Grid List */}
        <div className="p-5 overflow-y-auto max-h-[55vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredStates.map((state) => {
              const isSelected = selectedState.toLowerCase() === state.name.toLowerCase();
              return (
                <button
                  key={state.code}
                  type="button"
                  onClick={() => {
                    onSelectState(state.name);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0445DA] bg-blue-50/70 text-[#0445DA] font-bold shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 text-[1.1rem] font-black flex items-center justify-center shrink-0 uppercase">
                      {state.code}
                    </span>
                    <div className="truncate">
                      <span className="text-[1.4rem] font-bold block truncate">
                        {state.name}
                      </span>
                      {state.capital && (
                        <span className="text-[1.15rem] text-gray-400 block truncate">
                          {state.capital}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0445DA] text-white flex items-center justify-center shrink-0">
                      <CheckIcon size={12} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {filteredStates.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p className="text-[1.4rem]">No matching state found for &quot;{search}&quot;</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[1.2rem] text-gray-500">
          <span>Operating across all 28 States &amp; 8 UTs of India</span>
          <span className="font-bold text-[#0445DA]">Smart Driver Partner Network</span>
        </div>
      </div>
    </div>
  );
};
