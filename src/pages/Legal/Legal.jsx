// =============================================
// File: src/pages/Legal/Legal.jsx
// Legal Terms, Acceptable Use, Copyright & IP,
// Remix/Collab policy, Enforcement & Appeals,
// Transparency, Privacy & Cookies summaries.
// =============================================

import { useEffect } from "react";
import s from "./styles.module.css";

export default function Legal() {
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className={s.legalPage}>
      <div className={s.grid}>
        {/* Sidebar */}
        <aside className={s.sidenav}>
          <div className={s.sidenavTitle}>Legal</div>
          <div className={s.sidenavUnderline} />
          <nav className={s.nav}>
            <a className={s.linkOutline} href="#terms">Terms of Service</a>
            <a className={s.linkOutline} href="#privacy">Privacy Policy</a>
            <a className={s.linkOutline} href="#cookies">Cookie Policy</a>
            <a className={s.linkOutline} href="#copyright">Copyright Information</a>
            <a className={s.linkOutline} href="#licensing">Licensing</a>
          </nav>
        </aside>

        {/* Main content */}
        <main className={s.content}>
          {/* TERMS OF SERVICE */}
          <section id="terms" className={`${s.card} ${s.anchorTarget}`}>
            <h1 className={s.titleXL}>Terms of Service</h1>
            <p className={s.muted}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className={s.titleSM}>1. Agreement to Terms</h2>
            <p>
              These Terms of Service (“Terms”) govern your access to and use of the Leep platform, websites, apps,
              and related services (“Service”) provided by Leep Inc. By creating an account, uploading or accessing
              content, or otherwise using the Service, you agree to be bound by these Terms.
            </p>

            <h2 className={s.titleSM}>2. Eligibility & Accounts</h2>
            <ul className={s.list}>
              <li>You must be legally able to enter into this agreement. If you are under the age of majority, a parent or legal guardian must consent.</li>
              <li>You are responsible for safeguarding your account credentials and for all activities that occur under your account.</li>
            </ul>

            <h2 className={s.titleSM}>3. User Content & License to Leep</h2>
            <p>
              “Content” means audio, stems, compositions, recordings, metadata, images, text, and other materials you upload or submit.
              You retain any ownership rights you hold in your Content. You grant Leep a worldwide, non-exclusive, royalty-free license
              to host, store, transmit, display, and technically reproduce your Content solely to operate, maintain, and improve the Service,
              including enabling collaboration, previews, moderation, and discovery features.
            </p>

            <h2 className={s.titleSM}>4. Acceptable Use</h2>
            <ul className={s.list}>
              <li>Do not upload or share Content without all necessary rights, licenses, consents, and releases.</li>
              <li>Do not infringe intellectual property, publicity, privacy, or other rights of any person or entity.</li>
              <li>Do not engage in unlawful, fraudulent, deceptive, harassing, or abusive conduct.</li>
              <li>Do not attempt to bypass security, watermarking, fingerprinting, or access controls.</li>
            </ul>

            <h2 className={s.titleSM}>5. Remix & Collaboration</h2>
            <ul className={s.list}>
              <li>
                <strong>Owner Approval:</strong> Uploaders may designate “Collaboration OK”, “Remix OK”, or “No Derivatives.”
                Derivative uses are permitted only in accordance with the uploader’s settings or with express permission.
              </li>
              <li>
                <strong>Stems & Downloads:</strong> Stems, remixes, or full songs may not be downloaded without owner approval.
                Request flows must be used where provided.
              </li>
              <li>
                <strong>Representations:</strong> You represent and warrant that you hold, or have secured, all rights needed for any remix, sample, or derivative.
              </li>
            </ul>

            <h2 className={s.titleSM}>6. Ownership Verification & Provenance</h2>
            <ul className={s.list}>
              <li>
                <strong>Mandatory Rights Checklist:</strong> At upload, you must affirm ownership or license for all included sounds,
                samples, lyrics, and recordings.
              </li>
              <li>
                <strong>Metadata & Audit Trail:</strong> Leep may log uploader ID, timestamp, IP address, license references, and similar metadata,
                and may apply invisible identifiers or watermarking to support provenance and dispute resolution.
              </li>
            </ul>

            <h2 className={s.titleSM}>7. Automated Tools & Human Review</h2>
            <p>
              Leep may use automated fingerprinting, watermarking, and machine-learning triage to detect potentially infringing or restricted
              content, in combination with human review for borderline cases and fair-use assessments. Integration with third-party tools or
              rights programs may be used to facilitate takedowns or licensed uses.
            </p>

            <h2 className={s.titleSM}>8. Moderation & Enforcement</h2>
            <ul className={s.list}>
              <li><strong>Flagging & Trusted Reporters:</strong> Community reporting is available. Leep may designate trusted reporters (e.g., rights-holders) to expedite review.</li>
              <li><strong>Enforcement Ladder:</strong> Warning → temporary restriction → content removal → account termination for repeat or egregious violations.</li>
              <li>Leep may remove or restrict Content or accounts to comply with law, protect users or rights-holders, or enforce these Terms.</li>
            </ul>

            <h2 className={s.titleSM}>9. Appeals & Counter-Notices</h2>
            <p>
              If your Content is removed or restricted, you may submit an appeal. Where applicable law provides, you may submit a counter-notice
              with sufficient information to evaluate your claim. Leep will maintain records of actions and may restore Content if appropriate.
            </p>

            <h2 className={s.titleSM}>10. Transparency</h2>
            <ul className={s.list}>
              <li>Creators may access a dashboard showing remixes, collaboration requests, and moderation actions relevant to their Content.</li>
              <li>Leep may publish periodic aggregate statistics (e.g., takedowns, reinstatements, user bans) to inform the community.</li>
              <li>“View Song History” may show provenance and genealogy of tracks (originals, remixes, contributions).</li>
            </ul>

            <h2 className={s.titleSM}>11. Disclaimers & Limitation of Liability</h2>
            <p>
              The Service is provided “as is” and “as available.” To the maximum extent permitted by law, Leep disclaims all warranties and
              will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or goodwill.
              Some jurisdictions do not allow certain limitations; in such cases, those limitations apply to the maximum extent permitted.
            </p>

            <h2 className={s.titleSM}>12. Termination</h2>
            <p>
              You may stop using the Service at any time. Leep may suspend or terminate access, remove Content, or take other action for
              violation of these Terms, legal requirements, or risk to users or rights-holders.
            </p>

            <h2 className={s.titleSM}>13. Changes to the Service or Terms</h2>
            <p>
              We may modify the Service or these Terms. Material changes will be communicated by updating this page or via notice in the Service.
              Continued use after changes take effect constitutes acceptance of the revised Terms.
            </p>

            <h2 className={s.titleSM}>14. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction where Leep Inc is organized, without regard to conflict-of-law principles.
              Any dispute shall be resolved in the competent courts of that jurisdiction, unless applicable law provides otherwise.
            </p>

            <h2 className={s.titleSM}>15. Contact</h2>
            <p>
              For legal notices, rights claims, or privacy requests, contact: <em>legal@leep.inc</em> (or the contact method provided in the app).
            </p>

            <div className={s.cardTight}>
              <p className={`${s.muted} ${s.noteSM}`}>
                This template summarizes platform policies and is not legal advice. Consult counsel for jurisdiction-specific language.
              </p>
            </div>
          </section>

          {/* PRIVACY POLICY (summary; link to full if you have one) */}
          <section id="privacy" className={`${s.card} ${s.anchorTarget}`}>
            <h1 className={s.titleXL}>Privacy Policy</h1>
            <p>
              We collect information you provide (account details, uploads, messages) and technical data (device, IP, approximate location,
              cookies). We use this to operate and improve the Service, enable collaboration, enforce rights, and keep users safe. We may use
              automated systems and human review for moderation and rights enforcement. We share data with service providers under contract and
              disclose information where required by law or to protect users and rights-holders.
            </p>
            <ul className={s.list}>
              <li>Your choices include access, correction, and deletion where applicable by law.</li>
              <li>We maintain security measures and retain data as necessary for the purposes described.</li>
              <li>International transfers may occur in accordance with applicable law.</li>
              <li>Contact us to exercise your rights or ask questions about this Policy.</li>
            </ul>
            <p className={s.muted}>
              For the detailed Privacy Policy, see the dedicated privacy document or in-app link.
            </p>
          </section>

          {/* COOKIE POLICY */}
          <section id="cookies" className={`${s.card} ${s.anchorTarget}`}>
            <h1 className={s.titleXL}>Cookie Policy</h1>
            <p>
              We use cookies and similar technologies to keep you signed in, remember preferences, measure performance, and support safety
              features such as fraud detection and abuse prevention. You can manage cookies via your browser settings. Some features may not
              function without essential cookies.
            </p>
            <ul className={s.list}>
              <li><strong>Essential:</strong> authentication, security, session continuity.</li>
              <li><strong>Preferences:</strong> UI and audio settings.</li>
              <li><strong>Analytics:</strong> usage and performance measurement.</li>
            </ul>
          </section>

          {/* COPYRIGHT & IP */}
          <section id="copyright" className={`${s.card} ${s.anchorTarget}`}>
            <h1 className={s.titleXL}>Copyright Information</h1>
            <h2 className={s.titleSM}>Notices & Takedowns</h2>
            <p>
              Leep does not authorize copyright infringement. If you are a rights-holder and believe Content on the Service infringes your
              rights, submit a sufficiently detailed notice identifying the work, the allegedly infringing material, your authority to act,
              and your contact information. Upon receipt of a valid notice, Leep may remove or restrict Content and notify the uploader.
            </p>

            <h2 className={s.titleSM}>Counter-Notices & Appeals</h2>
            <p>
              If your Content is removed due to a claim and you believe the removal was in error, you may submit a counter-notice where
              permitted by law. Leep will review counter-notices and may restore Content if appropriate.
            </p>

            <h2 className={s.titleSM}>Fingerprinting & Trusted Reporters</h2>
            <p>
              Leep may use fingerprinting and maintain a trusted reporter program for qualified rights-holders to expedite review. Borderline
              cases may be evaluated by human reviewers, including fair-use considerations where applicable.
            </p>
          </section>

          {/* LICENSING & REMIX POLICY */}
          <section id="licensing" className={`${s.card} ${s.anchorTarget}`}>
            <h1 className={s.titleXL}>Licensing</h1>
            <ul className={s.list}>
              <li>
                <strong>Uploader Representations:</strong> You represent and warrant that you own or control all necessary rights (including
                samples, compositions, recordings, and performances) for Content you upload.
              </li>
              <li>
                <strong>Permissions & Settings:</strong> Set your collaboration/remix preferences. If “No Derivatives” is selected, derivative
                uses are prohibited without express permission.
              </li>
              <li>
                <strong>No Unapproved Downloads:</strong> Remixes, stems, and songs may not be downloaded without the owner’s approval.
              </li>
              <li>
                <strong>Provenance:</strong> Leep may watermark uploads and store metadata to support ownership claims and dispute resolution.
              </li>
            </ul>

            <h2 className={s.titleSM}>Upload Acknowledgments</h2>
            <div className={s.checkboxRow}>
              <label className={s.checkboxLabel}>
                <input type="checkbox" disabled className={s.checkboxInput} />
                <span className={s.checkboxText}>
                  I confirm I own or have obtained all necessary licenses, consents, and releases for this upload. I understand Leep does not
                  authorize copyright infringement and may remove or restrict Content subject to a valid rights-holder claim.
                </span>
              </label>
              <label className={s.checkboxLabel}>
                <input type="checkbox" disabled className={s.checkboxInput} />
                <span className={s.checkboxText}>
                  For remixes/derivatives, I represent and warrant that I hold permissions for all source material used, and I will honor any
                  owner settings such as “No Derivatives.”
                </span>
              </label>
            </div>
            <p className={s.muted}>
              (In product, these acknowledgments appear as required checkboxes at upload time.)
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
