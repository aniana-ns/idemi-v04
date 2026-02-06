
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Zap, CheckCircle, Activity, Radio, Cpu, Battery, 
  User, Mail, Phone, Eye, X, ChevronUp, Download, ExternalLink, FileText 
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const ElectroTechnical: React.FC = () => {
  useScrollAnimation();
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const SECTIONS = [
    {
        id: 'high-precision',
        title: 'High Precision Calibration (Multifunction Calibrators & DMM)',
        icon: <Activity size={24} className="text-secondary" />,
        content: {
            leftTitle: 'We Undertake Calibration of',
            leftItems: [
                'Fluke - 5730 A, 5720A, 5700A with Transconductance amplifier (Model 5725 A ,52120 A etc.)',
                'Fluke Model 5520A, 5522A with Scope & Power Quality option',
                'Fluke 5502 A, 5500 A, 5080 A, 9100 A, 9500 B, 7526 A, 725',
                'Digital Multimeters (3½ to 8½ digits): Fluke 8508A, 8846A, 8045A, 8840A',
                'Keysight / Agilent / HP 3458 A, 34410A, 34401A, 34420A',
                'Wavetek Datron 1281, 1271',
                'Transmil - Series 8000, 8100',
                'Keithley Series: 2000, 2001, 2002, 2010, 2100 etc.',
                'Time Electronics 5075, 5065',
                'Makes: Fluke, Transmil, Time Electronics, Zeal, Meco, Aplab, Picotest, Escort & many more.'
            ],
            rightTitle: 'IDEMI Primary Reference Standards',
            rightItems: [
                'Binary Voltage Divider',
                'Reference Divider & DC Voltage Standard',
                'Thermal Transfer Standard',
                'AC Voltage Divider with Standard Capacitor',
                'Multiproduct Calibrator',
                'AC Measurement Standard',
                'AC / DC Shunt',
                'Resistance Standard'
            ]
        }
    },
    {
        id: 'lcr',
        title: 'L - C - R Calibration',
        icon: <Cpu size={24} className="text-secondary" />,
        content: {
            leftTitle: 'We Undertake Calibration of',
            leftItems: [
                'Standard Shunts, Standard Resistors',
                'Standard Inductors, Standard Capacitors',
                'Decade Capacitance Box, Decade Inductance Box, Decade Resistance Box',
                'All Types of LCR Meters and LCR Bridges',
                'Handheld LCR Meters',
                'Sound Level Meters, Sound Level Calibrators',
                'Digital Tachometers, Digital Stroboscope, RPM Source, Drives and many more...'
            ],
            rightTitle: 'IDEMI Primary Reference Standards',
            rightItems: [
                'Automatic DC Current Comparator',
                'Resistance Bridge with Amplifier',
                'Duel Source High Resistance Bridge',
                'Standard Inductor, Capacitor & Resister',
                'Sound Level Meter & Calibrator',
                'Digital Tachometer'
            ]
        }
    },
    {
        id: 'hv',
        title: 'High Voltage / CT-PT Calibration',
        icon: <Zap size={24} className="text-secondary" />,
        content: {
            leftTitle: 'We Undertake Calibration of',
            leftItems: [
                'H V Testers, AC / DC HV Dividers, H V Probes, Resonance Systems & CVD up to 200kV @ 50Hz',
                'Spark Tester, Jeep Meter, Holiday Detecter, Static kV Meters, Oil Test sets, Oil BDV',
                'Standard PT, Industrial PT, EPD with Capacitors up to 132 kV/√3 @ 50Hz',
                'Standard CT, Metering CT, Industrial CT up to 10000 A, ICT, AITTS , Burden Box',
                'Standard Capacitor, Tan Delta Calibrators, Capacitor & Tan Delta Meters up to 100kV',
                'Impulse Analyser, PD measuring system',
                'Makes: Haefely, WS Test System, Hivolt, Hipotronics, Phenix, Tettex, Shivnanda, Quadrant, Power Electronical etc.'
            ],
            rightTitle: 'IDEMI Primary Reference Standards',
            rightItems: [
                '200 kV AC/DC System',
                '100 kV Capacitor with EPD',
                '10,000 A Current Transformer'
            ]
        }
    },
    {
        id: 'power',
        title: 'Precision Power / Energy Calibration',
        icon: <Battery size={24} className="text-secondary" />,
        extraInfo: 'Range: 1V to 1000V, 1mA to 300A, 0.01PF to UPF, 40Hz to 70Hz',
        content: {
            leftTitle: 'We Undertake Calibration of',
            leftItems: [
                'High Precision Power / Energy Ref. Stds. (Accuracy: 0.004% to 0.01%)',
                'ZERA Model COM 5003, COM 3003, COM 3000',
                'MTE Model K 2006',
                'RADIAN RESEARCH - RX 33',
                'Measurement International - 2010',
                'Secondary Power/Energy standards (Class 0.02% to 0.2%)',
                'EPZ 303, RX 31, RX 30, MT 510, MTE SRS & PRS SERIES',
                'ZERA MT310, TPZ, MT30, MT10',
                'All types Power/Energy Meters, Transducers, Clamps, PQ Analyzers'
            ],
            rightTitle: 'IDEMI Primary Reference Standards',
            rightItems: [
                'Precision Power & Energy Comparator',
                'Power / Energy Calibration System',
                'Multifunction Calibrator'
            ]
        }
    },
    {
        id: 'emc',
        title: 'EMC Calibration',
        icon: <Radio size={24} className="text-secondary" />,
        content: {
            leftTitle: 'We Undertake Calibration of Generators',
            leftItems: [
                'Electrical Fast Transient Generator (IEC 61000-4-4)',
                'Surge Generator (IEC 61000-4-5)',
                'Telecom Surge Generator (IEC 61000-4-5)',
                'Electrostatic Discharge Generator (IEC 61000-4-2)',
                'Voltage Dips and Interruption Generator (IEC 61000-4-11 / 4-29)',
                'Power Frequency Magnetic Field Generator (IEC 61000-4-8)',
                'Pulse Magnetic Field Generator (IEC 61000-4-18)',
                'Damped Oscillatory Generator (IEC 61000-4-18)',
                'Ring Wave Generator (IEC 61000-4-12)',
                'Damped Oscillatory Magnetic Field Generator (IEC 61000-4-10)',
                'Impulse Voltage Generator'
            ],
            rightTitle: 'IDEMI Primary Reference Standards',
            rightItems: [
                'Digital Oscilloscope',
                'Load Resistor',
                'ESD Target',
                'Current Probe',
                'HV Differential Probe'
            ]
        }
    }
  ];

  const TABLES = {
    electrical: [
        { param: "DC Voltage", range: "10 uV to 1050 V", cal: "500 ppm to 0.1 ppm" },
        { param: "DC High Voltage", range: "1.05 to 100 kV", cal: "300 ppm" },
        { param: "DC Current", range: "1 pA to 3000 A", cal: "1.5% to 10 ppm" },
        { param: "DC Resistance", range: "1 µΩ to 100 TΩ", cal: "1.5% to 1 ppm" },
        { param: "AC Voltage (10Hz-1MHz)", range: "1mV to 1000 V", cal: "0.3% to 0.001%" },
        { param: "AC High Voltage (50 Hz)", range: "1.01kV to 200 kV", cal: "0.01% to 1.4%" },
        { param: "AC Current (10Hz-10kHz)", range: "10 µA to 10000 A", cal: "60ppm to 0.25%" },
        { param: "Active/Reactive Power/Energy", range: "1V-1050V, 0.001A-300A, 40-70Hz", cal: "400ppm to 20 ppm / PF" },
        { param: "Power Factor / Phase Angle", range: "0 to UPF (0 to 360°)", cal: "0.0012° to 0.008°" },
        { param: "Frequency / Period", range: "40 mHz to 20 GHz", cal: "1.5E-11 to 1.3E-12" },
        { param: "Time Interval", range: "1µs to 24 Hrs & multiple", cal: "230ppm to 11 ppm" },
        { param: "AC Resistance", range: "0.001Ω to 10k Ω", cal: "0.36% to 0.0025%" },
        { param: "Inductance", range: "0.001Ω to 10k Ω", cal: "0.36% to 0.0025%" },
        { param: "Capacitance", range: "1 pF to 1 F", cal: "800ppm to 2.3 ppm" },
        { param: "DC Power / Energy", range: "33 mV-1000V, 3.3mA-30A", cal: "0.006% to 0.15%" }
    ],
    hv_special: [
        { param: "Capacitance at High Voltage", range: "Up to 30kV - 1000pF\nUp to 100kV - 100pF\nUpto 2000 V - 2000pF", cal: "0.012%\n0.02%\n0.05%" },
        { param: "Tan Delta", range: "5E-5 to 5E-2", cal: "1.6E-5 to 5.7E-3" },
        { param: "Oscilloscope Bandwidth", range: "50kHz to 1.1GHz", cal: "2.4% to 5%" },
        { param: "Oscilloscope Amplitude", range: "5mV to 5.5 Vp-p\n1mV to 130V (1MΩ)", cal: "5% to 0.15%\n5% to 0.3%" },
        { param: "Oscilloscope Time Base", range: "1 ns to 5s", cal: "0.6% to 3ppm" },
        { param: "Power Quality Harmonics", range: "Order 1 to 40", cal: "0.2%" },
        { param: "Impulse Calibration", range: "1kV to 15 kV\n10ns to 100 µs", cal: "6.3%\n0.1%" },
        { param: "Temperature Indicators (Sim.)", range: "RTD: -200°C to 850°C\nT/C: -200°C to 2300°C", cal: "0.005°C to 0.02°C\n0.01°C to 0.25°C" },
        { param: "Transformer Turns Ratio (TTR)", range: "0.8 to 2100", cal: "0.03%" },
        { param: "Potential Transformer (PT)", range: "1.1kV to 100kV AC (50Hz)", cal: "Ratio: 0.01%\nPhase: 0.32min" },
        { param: "Current Transformer (CT)", range: "5A - 10000 A AC (50Hz)", cal: "Ratio: 0.004%-0.025%\nPhase: 0.15min-0.65min" },
        { param: "CT-PT Burden", range: "1 VA to 100VA", cal: "0.05%" },
        { param: "CT-PT Comparator (AITTS)", range: "0.05 A-6A, 25V-150V", cal: "Ratio: 0.003%-0.02%\nPhase: 0.1min-0.6min" },
        { param: "Isolation Current Transformer", range: "1mA to 120A (50/60Hz)", cal: "Ratio: 0.0076%-0.01%\nPhase: 0.30min-0.25min" }
    ],
    rf: [
        { param: "RF Power", range: "100 kHz to 4 GHz\n+24dBm to -90 dBm", cal: "2.2% to 30%" },
        { param: "RF Attenuation", range: "200 Hz to 4 GHz\n1 dB to 110 dB", cal: "0.03 dB to 0.2dB" },
        { param: "Amplitude Modulation", range: "Carrier 1 GHz, Depth 10%-99%", cal: "5%" },
        { param: "Frequency Modulation", range: "Carrier 1 GHz, Dev 10-200 kHz", cal: "4%" },
        { param: "Impulse (LI) Rise Time/T1", range: "0.84 µS", cal: "2.5%" },
        { param: "Impulse (LI) Time to Half/T2", range: "60 µS", cal: "2.5%" },
        { param: "Switching Impulse", range: "+80 V to + 1600 V", cal: "0.6%" },
        { param: "Partial Discharge", range: "1pC to 50 nC", cal: "6%" }
    ],
    emc: [
        { param: "EFT - Amplitude (50Ω & 1kΩ)", range: "± 0.25 kV to 4.0kV" },
        { param: "EFT - Rise Time / Pulse Width", range: "5ns / 50ns" },
        { param: "Surge - Open Circuit Voltage", range: "± 0.5kV to ± 7.0 kV" },
        { param: "Surge - Short Circuit Current", range: "± 0.25kA to ± 4 kA" },
        { param: "ESD - Peak Current (±2kV-15kV)", range: "± 7.5 to ± 60A" },
        { param: "ESD - Rise Time", range: "0.8ns" },
        { param: "Voltage Dips", range: "Dips at 240V rms (10ms-5 sec)" },
        { param: "Power Freq Magnetic Field", range: "1 A-100A" },
        { param: "Pulse Magnetic Field", range: "100 to 1000A/m" },
        { param: "Telecom Surge - Voltage", range: "± 0.5kV to ± 10.0 kV" },
        { param: "Damp Oscillatory (Slow)", range: "± 0.25kV to ± 2.5 kV" },
        { param: "Damp Oscillatory (Fast)", range: "± 0.25kV to ± 4 kV" },
        { param: "Ring Wave - Voltage", range: "± 0.25kV to ± 4 kV" },
        { param: "Damped Oscillator Mag Field", range: "11.1 to 111A (Peak)" }
    ]
  };

  const TABLE_CATEGORIES = [
    { key: 'electrical', title: 'Electrical & LCR Parameters' },
    { key: 'hv_special', title: 'High Voltage, Special & Oscilloscope Parameters' },
    { key: 'rf', title: 'RF & Impulse Parameters' },
    { key: 'emc', title: 'EMC Calibration Parameters' }
  ];

  const CUSTOMER_FORM_LINK = "https://drive.google.com/file/d/14jA9wFx2qwabrjzuhGvVlsHj5-8TQqhb/view?usp=drive_link";

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Electro-Technical Calibration Services | High Precision NABL CC-2287 | IDEMI', 
          description: 'NABL accredited Electro-Technical Calibration for 8.5 digit Multimeters, Calibrators (Fluke 5730A), Oscilloscopes, Energy Meters, High Voltage equipment up to 200kV, and EMC equipment. Premier lab in Asia with primary standards.',
          keywords: [
            'Electro-Technical Calibration Mumbai', 
            'NABL CC-2287 Electrical Calibration', 
            'Multifunction Calibrator Calibration', 
            '8.5 Digit DMM Calibration', 
            'High Voltage CT PT Calibration', 
            'Precision Power Energy Meter Calibration', 
            'EMC Generator Calibration', 
            'Fluke 5730A Calibration',
            'Primary Standards Metrology'
          ],
          schemaType: 'Service'
        }} 
        path="/services/calibration/electro-technical" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/calibration" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Calibration
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Electro-Technical Calibration</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Pioneers In Calibration</p>
                
                <img src="https://images.unsplash.com/photo-1580894732930-0babd100d356?auto=format&fit=crop&q=80" alt="Electro-Technical Calibration" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                {/* Service Sections */}
                <div className="space-y-16 mt-12">
                    {SECTIONS.map((section) => (
                        <div key={section.id} id={section.id} className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                                <div className="p-2 bg-blue-50 dark:bg-gray-700 rounded-lg text-secondary">
                                    {section.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                                    {section.extraInfo && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{section.extraInfo}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">{section.content.leftTitle}</h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        {section.content.leftItems.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle size={14} className="text-green-500 shrink-0 mt-1" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg border border-gray-100 dark:border-gray-600 h-full">
                                        <h4 className="font-bold text-primary dark:text-blue-400 text-sm uppercase tracking-wide mb-3">{section.content.rightTitle}</h4>
                                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-4">
                                            {section.content.rightItems.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Important Documents Section */}
                <div className="mt-16 mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Important Documents</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                viewingId === 'cust-req' 
                                ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                                : 'border-gray-50 dark:border-gray-800 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                            }`}>
                                <div className="flex items-center gap-3 flex-grow min-w-0">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-primary dark:text-blue-400 group-hover:text-secondary transition-colors shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-snug group-hover:text-secondary transition-colors truncate">
                                        Customer Request Form
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button 
                                        onClick={() => toggleView('cust-req')} 
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                                            viewingId === 'cust-req' 
                                            ? 'bg-red-50 border-red-200 text-red-600' 
                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'
                                        }`}
                                    >
                                        {viewingId === 'cust-req' ? <ChevronUp size={14} /> : <Eye size={14} />} {viewingId === 'cust-req' ? 'Hide' : 'Preview'}
                                    </button>
                                    <a 
                                        href={CUSTOMER_FORM_LINK} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="px-4 py-2 bg-primary text-white border-2 border-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition active:scale-95 flex items-center gap-2"
                                    >
                                        Download <Download size={14} />
                                    </a>
                                </div>
                            </div>
                            
                            {viewingId === 'cust-req' && (
                                <div className="px-2 pb-4 pt-2 animate-fade-in">
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                        <div className="bg-secondary p-2 flex justify-between items-center text-white">
                                            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <FileText size={14} /> Document Viewer
                                            </span>
                                            <div className="flex gap-2">
                                                <a href={CUSTOMER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors"><ExternalLink size={14} /></a>
                                                <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="w-full h-[500px] bg-white">
                                            <iframe src={getViewerUrl(CUSTOMER_FORM_LINK)} className="w-full h-full border-none" title="Customer Request Form" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Technical Parameters */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4">Calibration Measurement Capabilities (CMC)</h2>
                    
                    {TABLE_CATEGORIES.map((category) => (
                        <div key={category.key} className="mb-12 last:mb-0">
                            <h3 className="text-lg font-bold text-primary dark:text-blue-400 mb-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border-l-4 border-primary">
                                {category.title}
                            </h3>
                            
                            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                {/* Desktop Table */}
                                <table className="hidden md:table w-full text-sm text-left border-collapse bg-white dark:bg-gray-800">
                                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                        <tr>
                                            <th className="p-3 border border-gray-200 dark:border-gray-600 w-1/3">Parameter / Instrument</th>
                                            <th className="p-3 border border-gray-200 dark:border-gray-600 w-1/3">Range</th>
                                            <th className="p-3 border border-gray-200 dark:border-gray-600 w-1/3">{category.key === 'emc' ? 'Remarks / Standard' : 'Calibration Measurement Capability'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-300">
                                        {TABLES[category.key as keyof typeof TABLES].map((row: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                <td className="p-3 border border-gray-200 dark:border-gray-600 align-top font-medium">{row.param}</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-600 align-top whitespace-pre-line">{row.range}</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-600 align-top whitespace-pre-line">{row.cal || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Mobile Cards */}
                                <div className="md:hidden bg-gray-50 dark:bg-gray-800 p-4 space-y-4">
                                    {TABLES[category.key as keyof typeof TABLES].map((row: any, idx: number) => (
                                        <div key={idx} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                                            <h4 className="font-bold text-primary dark:text-blue-400 text-sm mb-3">{row.param}</h4>
                                            <div className="grid grid-cols-1 gap-2 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Range</span>
                                                    <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{row.range}</span>
                                                </div>
                                                {row.cal && (
                                                    <div className="flex flex-col border-t border-gray-100 dark:border-gray-600 pt-2 mt-2">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">{category.key === 'emc' ? 'Remarks' : 'CMC'}</span>
                                                        <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{row.cal}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Card */}
                <div className="mt-12 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Mr. Nishant Pawaskar</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">Joint Director (ECL)</p>
                        
                        <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600 dark:text-gray-300 pt-2">
                            <a href="mailto:ecl@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400">
                                <Mail size={16} className="shrink-0" /> ecl@idemi.org
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="shrink-0" /> 
                                <span>022-24050301 ext 240</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="shrink-0" /> 
                                <span>+91 81042 93678</span>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
          </div>
      </div>
    </div>
  );
};

export default ElectroTechnical;
