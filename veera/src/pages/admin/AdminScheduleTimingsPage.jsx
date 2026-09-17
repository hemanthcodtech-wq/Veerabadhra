import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Save, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

const PRESETS = [
  '8:00 AM – 11:00 AM',
  '11:00 AM – 2:00 PM',
  '2:00 PM – 5:00 PM',
  '5:00 PM – 8:00 PM',
  '9:00 AM – 1:00 PM',
  '1:00 PM – 6:00 PM',
];

export function AdminScheduleTimingsPage() {
  const { token } = useAuthStore();
  const { showToast } = useToastStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slots, setSlots] = useState([]);
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/admin/settings/schedule-timings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSlots(data.slots || []);
      } catch {
        showToast('Failed to load schedule timings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [token]);

  const addSlot = (label) => {
    const trimmed = (label || newLabel).trim();
    if (!trimmed) return;
    if (slots.find(s => s.label.toLowerCase() === trimmed.toLowerCase())) {
      showToast('This time slot already exists', 'error');
      return;
    }
    setSlots(prev => [...prev, { label: trimmed, enabled: true }]);
    setNewLabel('');
  };

  const removeSlot = (idx) => setSlots(prev => prev.filter((_, i) => i !== idx));
  const toggleSlot = (idx) => setSlots(prev => prev.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/settings/schedule-timings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slots }),
      });
      const data = await res.json();
      if (data.success) showToast('Schedule timings saved!');
      else showToast(data.error || 'Failed to save', 'error');
    } catch {
      showToast('Error saving timings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-brand-green/20 border-t-[#08183A] rounded-full animate-spin" />
    </div>
  );

  const enabledCount = slots.filter(s => s.enabled !== false).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-7 h-7 text-[#08183A]" />
          Schedule Delivery Timings
        </h1>
        <p className="text-gray-900/60 font-sans mt-1 text-sm">
          Define time slots customers can select during checkout for scheduled delivery.
          <span className="ml-2 text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
            {enabledCount} active slot{enabledCount !== 1 ? 's' : ''}
          </span>
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Customers will see <strong>enabled</strong> slots during checkout and must pick one before placing a shipping order.
          Disabled slots are hidden from checkout but kept here for reference.
        </p>
      </div>

      {/* Add New Slot */}
      <div className="bg-white rounded-2xl border border-brand-green/10 shadow-sm overflow-hidden">
        <div className="border-b border-brand-green/10 px-6 py-4 flex items-center gap-3 bg-[#FDF7E5]">
          <Plus className="w-5 h-5 text-brand-green" />
          <h2 className="font-bold text-gray-900">Add New Time Slot</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              id="schedule-slot-input"
              placeholder="e.g. 9:00 AM - 12:00 PM"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSlot()}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#08183A]/40 transition-all"
            />
            <button
              id="add-schedule-slot-btn"
              onClick={() => addSlot()}
              disabled={!newLabel.trim()}
              className="flex items-center gap-2 bg-[#08183A] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#08183A]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              <Plus className="w-4 h-4" /> Add Slot
            </button>
          </div>

          {/* Preset quick-add chips */}
          <div>
            <p className="text-[11px] font-bold text-gray-900/40 uppercase tracking-wider mb-2">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.filter(p => !slots.find(s => s.label === p)).map(preset => (
                <button
                  key={preset}
                  onClick={() => addSlot(preset)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-900/70 bg-[#FDF7E5] border border-brand-green/20 hover:border-brand-green/50 hover:bg-brand-green/5 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Clock className="w-3 h-3" /> {preset}
                </button>
              ))}
              {PRESETS.length > 0 && PRESETS.every(p => slots.find(s => s.label === p)) && (
                <span className="text-xs text-gray-400 italic">All presets added</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slots List */}
      <div className="bg-white rounded-2xl border border-brand-green/10 shadow-sm overflow-hidden">
        <div className="border-b border-brand-green/10 px-6 py-4 flex items-center gap-3 bg-[#FDF7E5]">
          <Clock className="w-5 h-5 text-brand-orange" />
          <h2 className="font-bold text-gray-900">Configured Time Slots</h2>
          <span className="ml-auto text-xs font-bold text-gray-900/40">{slots.length} slot{slots.length !== 1 ? 's' : ''}</span>
        </div>

        {slots.length === 0 ? (
          <div className="p-10 text-center">
            <Clock className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-900/40 font-sans text-sm">No time slots added yet.</p>
            <p className="text-gray-900/30 text-xs mt-1">Use the form above to add delivery time slots.</p>
          </div>
        ) : (
          <div className="divide-y divide-brand-green/5">
            {slots.map((slot, idx) => (
              <div key={idx}
                className={`flex items-center gap-4 px-6 py-4 transition-colors ${slot.enabled !== false ? 'bg-white hover:bg-[#FDF7E5]/50' : 'bg-gray-50/80'}`}
              >
                <span className="text-xs font-bold text-gray-900/20 w-5 text-center">{idx + 1}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${slot.enabled !== false ? 'bg-brand-green/10' : 'bg-gray-100'}`}>
                  <Clock className={`w-4 h-4 ${slot.enabled !== false ? 'text-brand-green' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${slot.enabled !== false ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{slot.label}</p>
                  <p className={`text-[11px] font-medium mt-0.5 ${slot.enabled !== false ? 'text-brand-green' : 'text-gray-400'}`}>
                    {slot.enabled !== false ? 'Visible to customers' : 'Hidden from checkout'}
                  </p>
                </div>
                <button
                  id={`toggle-slot-${idx}`}
                  onClick={() => toggleSlot(idx)}
                  title={slot.enabled !== false ? 'Disable slot' : 'Enable slot'}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    slot.enabled !== false
                      ? 'bg-brand-green/10 text-brand-green border-brand-green/20 hover:bg-brand-green/20'
                      : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {slot.enabled !== false ? <><ToggleRight className="w-3.5 h-3.5" /> Enabled</> : <><ToggleLeft className="w-3.5 h-3.5" /> Disabled</>}
                </button>
                <button
                  id={`delete-slot-${idx}`}
                  onClick={() => removeSlot(idx)}
                  title="Remove slot"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-6">
        <button
          id="save-schedule-timings-btn"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-green text-white hover:bg-brand-orange font-bold px-8 py-3 rounded-xl transition-colors disabled:opacity-50 text-sm shadow-sm"
        >
          {saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Timings</>
          )}
        </button>
      </div>
    </div>
  );
}
