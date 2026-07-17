import React, { useState, useRef } from "react";
import "../style/Home.scss";
import { Briefcase, User, UploadCloud, Sparkles, Info, FileText, X } from "lucide-react";

/**
 * ============================================================================
 * UI LAYER
 * ============================================================================
 * Pure presentational component. It owns zero business/network state —
 * everything it needs arrives via props, and every user action is reported
 * upward via callback props. This is the contract the future layers plug into:
 *
 *   API layer    -> generateInterviewPlan(jobDescription, resume|selfDescription)
 *   State layer  -> { jobDescription, resumeFile, selfDescription, status, plan }
 *   Hook layer   -> useInterviewPlanForm() returns state + the handlers below
 *   UI layer     -> <InterviewPlanForm {...everythingFromTheHook} />
 *
 * The only local state kept here is purely presentational (drag-over highlight,
 * focus rings) — nothing that the hook layer would need to know about.
 * ============================================================================
 */

const MAX_CHARS = 5000;

export function InterviewPlanForm({
  jobDescription = "",
  onJobDescriptionChange = () => {},
  resumeFile = null,
  onResumeSelect = () => {},
  onResumeClear = () => {},
  selfDescription = "",
  onSelfDescriptionChange = () => {},
  isGenerating = false,
  canGenerate = true,
  onGenerate = () => {},
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const charCount = jobDescription.length;
  const overLimit = charCount > MAX_CHARS;

  const handleFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    const okType = /\.(pdf|docx)$/i.test(file.name);
    if (!okType) return;
    onResumeSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="ip-root">
      <div className="ip-glow" aria-hidden="true" />

      <div className="ip-shell">
        {/* ---------------- Header ---------------- */}
        <header className="ip-header">
          <h1 className="ip-title">
            Create Your Custom <span className="ip-title-accent">Interview Plan</span>
          </h1>
          <p className="ip-subtitle">
            Let our AI analyze the job requirements and your unique profile to build a
            winning strategy.
          </p>
        </header>

        {/* ---------------- Main card ---------------- */}
        <div className="ip-card">
          <div className="ip-grid">
            {/* Left: Job description */}
            <section className="ip-panel" aria-labelledby="jd-label">
              <div className="ip-panel-head">
                <span id="jd-label" className="ip-panel-label">
                  <Briefcase size={14} strokeWidth={2.25} />
                  Target Job Description
                </span>
                <span className="ip-required">Required</span>
              </div>

              <div className="ip-textarea-wrap">
                <textarea
                  className="ip-textarea"
                  placeholder={`Paste the full job description here...\n\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
                  value={jobDescription}
                  maxLength={MAX_CHARS + 200}
                  onChange={(e) => onJobDescriptionChange(e.target.value)}
                />
              </div>

              <div className={`ip-charcount ${overLimit ? "is-over" : ""}`}>
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
              </div>
            </section>

            {/* Divider */}
            <div className="ip-divider" aria-hidden="true" />

            {/* Right: Profile */}
            <section className="ip-panel" aria-labelledby="profile-label">
              <div className="ip-panel-head">
                <span id="profile-label" className="ip-panel-label">
                  <User size={14} strokeWidth={2.25} />
                  Your Profile
                </span>
              </div>

              <div className="ip-field-block">
                <span className="ip-field-label">
                  Upload Resume <em>(Recommended)</em>
                </span>

                {!resumeFile ? (
                  <div
                    className={`ip-dropzone ${isDragOver ? "is-drag" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx"
                      hidden
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <div className="ip-dropzone-icon">
                      <UploadCloud size={22} strokeWidth={1.75} />
                    </div>
                    <div className="ip-dropzone-text">Click to upload or drag &amp; drop</div>
                    <div className="ip-dropzone-hint">PDF or DOCX (Max 5MB)</div>
                  </div>
                ) : (
                  <div className="ip-file-chip">
                    <FileText size={16} strokeWidth={2} />
                    <span className="ip-file-name">{resumeFile.name}</span>
                    <button
                      type="button"
                      className="ip-file-remove"
                      onClick={onResumeClear}
                      aria-label="Remove resume"
                    >
                      <X size={14} strokeWidth={2.25} />
                    </button>
                  </div>
                )}
              </div>

              <div className="ip-or">
                <span className="ip-or-line" />
                <span className="ip-or-text">OR</span>
                <span className="ip-or-line" />
              </div>

              <div className="ip-field-block ip-field-block-grow">
                <span className="ip-field-label">Quick Self-Description</span>
                <textarea
                  className="ip-textarea ip-textarea-small"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  value={selfDescription}
                  onChange={(e) => onSelfDescriptionChange(e.target.value)}
                />
              </div>

              <div className="ip-note">
                <Info size={13} strokeWidth={2.25} />
                <span>
                  Either a <strong>Resume</strong> or a <strong>Self Description</strong> is
                  required to generate a personalized plan.
                </span>
              </div>
            </section>
          </div>

          {/* ---------------- Footer ---------------- */}
          <div className="ip-footer">
            <span className="ip-footer-meta">AI-Powered Strategy Generation &bull; Approx. 30s</span>
            <button
              type="button"
              className="ip-cta"
              disabled={!canGenerate || isGenerating}
              onClick={onGenerate}
            >
              {isGenerating ? (
                <>
                  <span className="ip-spinner" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} strokeWidth={2.25} />
                  Generate My Interview Strategy
                </>
              )}
            </button>
          </div>
        </div>

        <footer className="ip-legal">
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <span className="ip-legal-dot">&bull;</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <span className="ip-legal-dot">&bull;</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Help Center</a>
        </footer>
      </div>

            

    </div>
  );
}

/**
 * ----------------------------------------------------------------------------
 * Temporary local-state wrapper — FOR PREVIEW ONLY.
 * Once the hook layer (e.g. useInterviewPlanForm) exists, delete this wrapper
 * and render <InterviewPlanForm /> directly with props from that hook.
 * ----------------------------------------------------------------------------
 */
export default function InterviewPlanPreview() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const canGenerate =
    jobDescription.trim().length > 0 && (!!resumeFile || selfDescription.trim().length > 0);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Placeholder only — real call belongs in the API layer.
    setTimeout(() => setIsGenerating(false), 1800);
  };

  return (
    <InterviewPlanForm
      jobDescription={jobDescription}
      onJobDescriptionChange={setJobDescription}
      resumeFile={resumeFile}
      onResumeSelect={setResumeFile}
      onResumeClear={() => setResumeFile(null)}
      selfDescription={selfDescription}
      onSelfDescriptionChange={setSelfDescription}
      isGenerating={isGenerating}
      canGenerate={canGenerate}
      onGenerate={handleGenerate}
    />
  );
}
