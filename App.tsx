import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AccessibilityProvider } from './lib/AccessibilityContext';
import Layout from './components/Layout';
import { SkeletonPage } from './components/SkeletonLoaders';

// Lazy Load Core Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Training = lazy(() => import('./pages/Training'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Contact = lazy(() => import('./pages/Contact'));
const ExtensionCentres = lazy(() => import('./pages/ExtensionCentres'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const StudentRegistration = lazy(() => import('./pages/StudentRegistration'));
const AlumniRegistration = lazy(() => import('./pages/AlumniRegistration'));
const DocumentViewer = lazy(() => import('./pages/DocumentViewer'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const PlacementPortal = lazy(() => import('./pages/PlacementPortal'));
const RecruiterEnquiry = lazy(() => import('./pages/RecruiterEnquiry'));
const FacultyPage = lazy(() => import('./pages/Faculty'));

// Decoupled Gallery Pages
const GalleryMain = lazy(() => import('./pages/GalleryMain'));
const GalleryBangalore = lazy(() => import('./pages/GalleryBangalore'));
const GallerySakinaka = lazy(() => import('./pages/GallerySakinaka'));

// Decoupled Info Pages
const WhosWho = lazy(() => import('./pages/WhosWho'));
const Committee = lazy(() => import('./pages/Committee'));
const Vigilance = lazy(() => import('./pages/Vigilance'));
const RTI = lazy(() => import('./pages/RTI'));
const Holidays = lazy(() => import('./pages/Holidays'));
const PastPerformance = lazy(() => import('./pages/PastPerformance'));
const DirectorsDesk = lazy(() => import('./pages/DirectorsDesk'));
const AtGlance = lazy(() => import('./pages/AtGlance'));
const VisionMission = lazy(() => import('./pages/VisionMission'));
const HowToReach = lazy(() => import('./pages/HowToReach'));
const InternationalAssociations = lazy(() => import('./pages/InternationalAssociations'));
const NationalAssociations = lazy(() => import('./pages/NationalAssociations'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const JobFair = lazy(() => import('./pages/JobFair'));
const MeitySchemes = lazy(() => import('./pages/MeitySchemes'));
const Careers = lazy(() => import('./pages/Careers'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Testimonials = lazy(() => import('./pages/Testimonials'));

// Decoupled Certificate Pages
const ISOCertificate = lazy(() => import('./pages/ISOCertificate'));
const AerospaceCertificate = lazy(() => import('./pages/AerospaceCertificate'));
const NABLCertificate = lazy(() => import('./pages/NABLCertificate'));
const QualityPolicyIEC = lazy(() => import('./pages/QualityPolicyIEC'));
const QualityPolicyISO = lazy(() => import('./pages/QualityPolicyISO'));

// Extension Centres
const BangaloreExtension = lazy(() => import('./pages/BangaloreExtension'));
const NagpurExtension = lazy(() => import('./pages/NagpurExtension'));
const SakinakaExtension = lazy(() => import('./pages/SakinakaExtension'));

// Training Pages
const AICTECourses = lazy(() => import('./pages/AICTECourses'));
const AICTESchedule = lazy(() => import('./pages/AICTESchedule'));
const ShortTermCourses = lazy(() => import('./pages/ShortTermCourses'));
const ProfessionalCourses = lazy(() => import('./pages/ProfessionalCourses'));
const SponsoredSchemes = lazy(() => import('./pages/SponsoredSchemes'));
const OnlineTraining = lazy(() => import('./pages/OnlineTraining'));
const LongTermCourses = lazy(() => import('./pages/LongTermCourses'));
const SCSTBeneficiaries = lazy(() => import('./pages/SCSTBeneficiaries'));
const TrainingIntroduction = lazy(() => import('./pages/TrainingIntroduction'));
const AnsysTraining = lazy(() => import('./pages/AnsysTraining'));
const UnigraphicsTraining = lazy(() => import('./pages/UnigraphicsTraining'));
const AutoCADTraining = lazy(() => import('./pages/AutoCADTraining'));
const ARVRTraining = lazy(() => import('./pages/ARVRTraining'));
const UXUITraining = lazy(() => import('./pages/UXUITraining'));
const TrainingEnquiry = lazy(() => import('./pages/TrainingEnquiry'));

// Service Pages
const Calibration = lazy(() => import('./pages/Calibration'));
const Testing = lazy(() => import('./pages/Testing'));
const ThreeDPrinting = lazy(() => import('./pages/ThreeDPrinting'));
const ToolDesign = lazy(() => import('./pages/ToolDesign'));
const ToolRoom = lazy(() => import('./pages/ToolRoom'));
const DesignDevelopment = lazy(() => import('./pages/DesignDevelopment'));
const ProductDesign = lazy(() => import('./pages/ProductDesign'));
const PrecisionMachining = lazy(() => import('./pages/PrecisionMachining'));
const Inspection = lazy(() => import('./pages/Inspection'));
const RapidPrototyping = lazy(() => import('./pages/RapidPrototyping'));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage'));

// Sub-Service Pages
const ElectroTechnical = lazy(() => import('./pages/ElectroTechnical'));
const Thermal = lazy(() => import('./pages/Thermal'));
const PressureCalibration = lazy(() => import('./pages/PressureCalibration'));
const MassVolumeCalibration = lazy(() => import('./pages/MassVolumeCalibration'));
const DimensionalMetrology = lazy(() => import('./pages/DimensionalMetrology'));
const FluidFlowCalibration = lazy(() => import('./pages/FluidFlowCalibration'));
const LaboratoryExcellenceAward = lazy(() => import('./pages/LaboratoryExcellenceAward'));

const SafetyTesting = lazy(() => import('./pages/SafetyTesting'));
const EMIEMC = lazy(() => import('./pages/EMIEMC'));
const EnvironmentalTesting = lazy(() => import('./pages/EnvironmentalTesting'));
const TypeTesting = lazy(() => import('./pages/TypeTesting'));
const LEDTesting = lazy(() => import('./pages/LEDTesting'));
const MonoblockPumpTesting = lazy(() => import('./pages/MonoblockPumpTesting'));
const CentrifugalPumpTesting = lazy(() => import('./pages/CentrifugalPumpTesting'));
const LocaTestFacility = lazy(() => import('./pages/LocaTestFacility'));

const SMTAssembly = lazy(() => import('./pages/SMTAssembly'));
const TechTransfer = lazy(() => import('./pages/TechTransfer'));
const Library = lazy(() => import('./pages/Library'));
const Hostel = lazy(() => import('./pages/Hostel'));
const Auditorium = lazy(() => import('./pages/Auditorium'));
const Consultancy = lazy(() => import('./pages/Consultancy'));

// Schemes
const PMKVYScheme = lazy(() => import('./pages/PMKVYScheme'));
const SCSTHubScheme = lazy(() => import('./pages/SCSTHubScheme'));
const ESDPATIScheme = lazy(() => import('./pages/ESDPATIScheme'));
const NSQFScheme = lazy(() => import('./pages/NSQFScheme'));
const KimanKaushalyaScheme = lazy(() => import('./pages/KimanKaushalyaScheme'));
const NBCFDCScheme = lazy(() => import('./pages/NBCFDCScheme'));
const BMCScheme = lazy(() => import('./pages/BMCScheme'));

// Downloads
const ActiveTenders = lazy(() => import('./pages/ActiveTenders'));
const ArchivedTenders = lazy(() => import('./pages/ArchivedTenders'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Prospectus = lazy(() => import('./pages/Prospectus'));
const AnnualReports = lazy(() => import('./pages/AnnualReports'));
const ProcurementPolicy = lazy(() => import('./pages/ProcurementPolicy'));
const ProcurementRules = lazy(() => import('./pages/ProcurementRules'));

const Success = lazy(() => import('./pages/Success'));

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AccessibilityProvider>
        <Router>
          <Layout>
            <Suspense fallback={<SkeletonPage />}>
              <Routes>
                {/* --- MAIN NAVIGATION --- */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/training" element={<Training />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/sitemap" element={<Sitemap />} />
                
                {/* Galleries */}
                <Route path="/gallery" element={<GalleryMain />} />
                <Route path="/gallery/main" element={<GalleryMain />} />
                <Route path="/gallery/bangalore" element={<GalleryBangalore />} />
                <Route path="/gallery/ecblrgallery" element={<GalleryBangalore />} />
                <Route path="/gallery/sakinaka" element={<GallerySakinaka />} />
                <Route path="/gallery/sakinakagallery" element={<GallerySakinaka />} />
                
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/newsletter" element={<Newsletter />} />

                {/* --- REDIRECTS FOR HIERARCHY --- */}
                <Route path="/services/training" element={<Navigate to="/training" replace />} />
                <Route path="/downloads" element={<Navigate to="/downloads/active-tenders" replace />} />
                <Route path="/training/schemes" element={<Navigate to="/training/schemes/day-nulm" replace />} />
                <Route path="/courses" element={<Navigate to="/training" replace />} />
                <Route path="/courses/mechanical-courses" element={<Navigate to="/training" replace />} />
                <Route path="/courses/animation" element={<Navigate to="/training" replace />} />
                <Route path="/design-development" element={<Navigate to="/services/design-development" replace />} />
                <Route path="/extension-centre" element={<Navigate to="/extensions" replace />} />
                <Route path="/schemes" element={<Navigate to="/training/schemes/day-nulm" replace />} />

                {/* --- UTILITIES --- */}
                <Route path="/view-document" element={<DocumentViewer />} />
                <Route path="/success" element={<Success />} />

                {/* --- INFO & EXTENSIONS --- */}
                <Route path="/whos-who" element={<WhosWho />} />
                <Route path="/committee" element={<Committee />} />
                <Route path="/vigilance" element={<Vigilance />} />
                <Route path="/rti" element={<RTI />} />
                <Route path="/about/rti" element={<RTI />} />
                <Route path="/holidays" element={<Holidays />} />
                <Route path="/past_performance" element={<PastPerformance />} />
                <Route path="/directors-desk" element={<DirectorsDesk />} />
                <Route path="/at-glance" element={<AtGlance />} />
                <Route path="/vision-mission" element={<VisionMission />} />
                <Route path="/how-to-reach" element={<HowToReach />} />
                <Route path="/international-associations" element={<InternationalAssociations />} />
                <Route path="/national-associations" element={<NationalAssociations />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/careers" element={<Careers />} />
                
                <Route path="/extensions" element={<ExtensionCentres />} />
                <Route path="/extension-centre/bangalore" element={<BangaloreExtension />} />
                <Route path="/extension-centre/nagpur" element={<NagpurExtension />} />
                <Route path="/extension-centre/sakinaka" element={<SakinakaExtension />} />

                {/* --- CERTIFICATES --- */}
                <Route path="/ISO-9001-2015-Certificate" element={<ISOCertificate />} />
                <Route path="/iso" element={<ISOCertificate />} />
                <Route path="/ISO-AS9100-2016" element={<AerospaceCertificate />} />
                <Route path="/NABL-Certificate" element={<NABLCertificate />} />
                <Route path="/nabl-certificate" element={<NABLCertificate />} />
                <Route path="/ISO-IEC" element={<QualityPolicyIEC />} />
                <Route path="/ISO-AS9100" element={<QualityPolicyISO />} />

                {/* --- SERVICES --- */}
                <Route path="/services/calibration" element={<Calibration />} />
                <Route path="/services/testing" element={<Testing />} />
                <Route path="/services/tool-room" element={<ToolRoom />} />
                <Route path="/services/tool-design" element={<ToolDesign />} />
                <Route path="/services/eos-formiga" element={<ThreeDPrinting />} />
                <Route path="/services/3d-printing" element={<ThreeDPrinting />} />
                <Route path="/services/design-development" element={<DesignDevelopment />} />
                <Route path="/services/product-design-development" element={<ProductDesign />} />
                <Route path="/services/precision-machining" element={<PrecisionMachining />} />
                <Route path="/services/inspection" element={<Inspection />} />
                <Route path="/services/rapid-prototyping-in-plastic" element={<RapidPrototyping />} />
                
                {/* Sub-Services */}
                <Route path="/services/calibration/electro-technical" element={<ElectroTechnical />} />
                <Route path="/services/calibration/thermal" element={<Thermal />} />
                <Route path="/services/calibration/pressure" element={<PressureCalibration />} />
                <Route path="/services/calibration/mass-volume" element={<MassVolumeCalibration />} />
                <Route path="/services/calibration/dimensional-metrology" element={<DimensionalMetrology />} />
                <Route path="/services/calibration/fluid-flow" element={<FluidFlowCalibration />} />
                <Route path="/services/calibration/laboratory-excellence-award" element={<LaboratoryExcellenceAward />} />

                <Route path="/services/testing/safety" element={<SafetyTesting />} />
                <Route path="/services/testing/emi_emc" element={<EMIEMC />} />
                <Route path="/services/testing/environmental" element={<EnvironmentalTesting />} />
                <Route path="/services/testing/type" element={<TypeTesting />} />
                <Route path="/services/testing/led" element={<LEDTesting />} />
                <Route path="/services/testing/monoblock_pumpset" element={<MonoblockPumpTesting />} />
                <Route path="/services/testing/centrifugal_pump" element={<CentrifugalPumpTesting />} />
                <Route path="/services/testing/loca-test-facility" element={<LocaTestFacility />} />
                <Route path="/services/tool-room-infrastructure" element={<InfrastructurePage />} />

                <Route path="/services/design-development/smt-assembly" element={<SMTAssembly />} />
                <Route path="/design-development/smt-assembly" element={<SMTAssembly />} />
                <Route path="/services/design-development/techtransfer" element={<TechTransfer />} />
                
                <Route path="/services/library" element={<Library />} />
                <Route path="/services/hostel" element={<Hostel />} />
                <Route path="/services/auditorium" element={<Auditorium />} />
                <Route path="/services/consultancy" element={<Consultancy />} />

                {/* --- TRAINING --- */}
                <Route path="/training/introduction" element={<TrainingIntroduction />} />
                <Route path="/training/aicte" element={<AICTECourses />} />
                <Route path="/training/aicte/schedule" element={<AICTESchedule />} />
                <Route path="/training/short-term-courses" element={<ShortTermCourses />} />
                <Route path="/training/online-training" element={<OnlineTraining />} />
                <Route path="/training/post-graduate-post-diploma" element={<LongTermCourses />} />
                <Route path="/training/professional-courses" element={<ProfessionalCourses />} />
                <Route path="/training/schemes/day-nulm" element={<SponsoredSchemes />} />
                <Route path="/jobfair" element={<JobFair />} />
                <Route path="/training/job-openings" element={<PlacementPortal />} />
                <Route path="/training/recruiter-enquiry" element={<RecruiterEnquiry />} />
                <Route path="/student-registration" element={<StudentRegistration />} />
                <Route path="/alumni-registration" element={<AlumniRegistration />} />
                <Route path="/training/sc_st_beneficiaries" element={<SCSTBeneficiaries />} />
                <Route path="/enquiry" element={<TrainingEnquiry />} />
                <Route path="/training/enquiry" element={<TrainingEnquiry />} />
                <Route path="/enquiry.php" element={<Navigate to="/training/enquiry" replace />} />
                
                <Route path="/courses/mechanical-courses/ansys" element={<AnsysTraining />} />
                <Route path="/courses/mechanical-courses/unigraphics" element={<UnigraphicsTraining />} />
                <Route path="/courses/mechanical-courses/autocad" element={<AutoCADTraining />} />
                <Route path="/courses/animation/arvr" element={<ARVRTraining />} />
                <Route path="/uxui" element={<UXUITraining />} />

                {/* --- SCHEMES --- */}
                <Route path="/meity/dashboard" element={<MeitySchemes />} />
                <Route path="/meity/testimonials" element={<MeitySchemes />} />
                
                <Route path="/schemes/pmkvy" element={<PMKVYScheme />} />
                <Route path="/training/schemes/pmkvy" element={<PMKVYScheme />} />
                <Route path="/schemes/sc-st-hub" element={<SCSTHubScheme />} />
                <Route path="/training/schemes/sc-st-hub" element={<SCSTHubScheme />} />
                <Route path="/schemes/esdpati" element={<ESDPATIScheme />} />
                <Route path="/training/schemes/esdpati" element={<ESDPATIScheme />} />
                
                <Route path="/schemes/nsqf" element={<NSQFScheme />} />
                <Route path="/schemes/kiman-kaushalya" element={<KimanKaushalyaScheme />} />
                <Route path="/schemes/nbcfdc" element={<NBCFDCScheme />} />
                <Route path="/schemes/bmc" element={<BMCScheme />} />

                {/* --- DOWNLOADS --- */}
                <Route path="/downloads/active-tenders" element={<ActiveTenders />} />
                <Route path="/downloads/archive-tenders" element={<ArchivedTenders />} />
                <Route path="/downloads/notifications" element={<Notifications />} />
                <Route path="/downloads/prospectus" element={<Prospectus />} />
                <Route path="/downloads/annual-reports" element={<AnnualReports />} />
                <Route path="/downloads/procurement-policy" element={<ProcurementPolicy />} />
                <Route path="/downloads/procurement-rules" element={<ProcurementRules />} />

                {/* --- 404 --- */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AccessibilityProvider>
    </HelmetProvider>
  );
};

export default App;
