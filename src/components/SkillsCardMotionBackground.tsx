import './SkillsCardMotionBackground.css'

const SkillsCardMotionBackground = () => (
  <div className="skills-card-bg" aria-hidden="true">
    <svg
      className="skills-card-bg__svg"
      viewBox="40 18 400 450"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      focusable="false"
    >
      <ellipse className="skills-card-bg__shadow" cx="261" cy="451" rx="105" ry="7" />

      <g className="skills-card-bg__speed" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M109 290h48m-66 10h52m-30 10h61M191 371c-11 5-18 13-22 23m18-32c-11 4-20 11-25 20M338 413c-1 10-5 18-11 24m19-20c-1 7-4 14-8 19" />
      </g>

      <g className="skills-card-bg__wheel">
        <circle cx="267" cy="391" r="58" fill="none" stroke="var(--skills-wheel)" strokeWidth="8" />
        <g className="skills-card-bg__spokes" fill="none" stroke="var(--skills-wheel)" strokeWidth="2" opacity="0.5">
          <path d="M267 337v108m-54-54h108m-92-38 76 76m0-76-76 76" />
          <circle cx="267" cy="391" r="44" />
        </g>
        <path d="m246 288 21 103" fill="none" stroke="#343647" strokeWidth="8" strokeLinecap="round" />
        <path d="M230 284h36" fill="none" stroke="#292c3c" strokeWidth="10" strokeLinecap="round" />
        <circle cx="267" cy="391" r="13" fill="#292c3c" />
        <path d="m267 391 23-19h18" fill="none" stroke="#555b69" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g className="skills-card-bg__rider">
        <path d="m251 254 52 42q11 8 7 23l-13 40-20-5 8-42-49-25Z" fill="#303448" />
        <path d="m279 349 18 5-2 9 16 6q6 2 4 8l-1 3-39-10q-5-1-3-7Z" fill="#262b3c" />
        <path d="m276 367 36 10" fill="none" stroke="#f8f6ef" strokeWidth="4" strokeLinecap="round" />
        <path d="m229 254 21 8 32 47q7 10-2 20l-49 48-15-14 40-46-35-32q-14-16 8-31Z" fill="#41465b" />
        <path d="m214 360 18 15-7 7 12 12q5 5 1 10l-3 3q-3 3-7-1l-26-26q-4-4 0-8Z" fill="#292c3c" />
        <path d="m205 379 28 27" fill="none" stroke="#f8f6ef" strokeWidth="4" strokeLinecap="round" />

        <path d="M224 179q-13-6-28 4l-38 23-45-14-8 15 51 24q9 4 18-1l38-20Z" fill="#077da4" />
        <path d="m112 193-10-10q-4-4-7-1l4 7-10-4q-7-2-6 4l5 8 17 10Z" fill="#e9b5a2" />
        <path d="m263 180 33 28 45-18 7 16-48 24q-8 4-15-1l-27-19Z" fill="#08769b" />
        <path d="m341 190 6-10q3-5 7-2l-2 8 10-7q5-2 6 3l-5 11-15 13Z" fill="#e9b5a2" />
        <path d="M226 174q16-7 32 3l10 80-19 16-28-10Z" fill="#fcfaf2" />
        <path d="m226 174 11 4-2 51 8 41-18 10q-12 1-13-11l4-71Z" fill="#086b91" />
        <path d="m249 176 11 2q8 6 9 23l5 55-16 7-6-43Z" fill="#0782a6" />
        <path d="m228 179-8 13 10 5-8 8 9 31m25-54 8 11-7 6 9 8-8 26" fill="none" stroke="#075c81" strokeWidth="2" />

        <path d="m239 158-2 18q3 10 14 8l5-8-7-16Z" fill="#dda38f" />
        <path d="M236 138q10-11 20 1l2 11 7 6-7 4q0 12-10 12l-13-10-4-14Z" fill="#efbdaa" />
        <path d="M237 153q-9-1-12-10-5-2-3-9 1-6 8-6-2-7 5-9 5-2 9 3 8-9 13-3 5 7-4 13l-12 6 2 12Z" fill="#303348" />
        <circle cx="237" cy="151" r="4" fill="#efbdaa" />
        <path d="m251 146 3 1" stroke="#3b3844" strokeWidth="2" strokeLinecap="round" />

        <path d="M239 179q-23 4-39-8t-35-11q-15 0-28-14" fill="none" stroke="#e9ad16" strokeWidth="8" strokeLinecap="round" />
        <path d="m240 178 9 4-5 8-8-8Z" fill="#f2bd30" />
      </g>

      <g className="skills-card-bg__float skills-card-bg__float--laptop">
        <g transform="translate(81 160) rotate(-17)">
          <rect x="-28" y="-24" width="48" height="34" rx="4" fill="#35394d" />
          <rect x="-24" y="-20" width="40" height="25" rx="1" fill="#eef4f3" />
          <path d="m-15-12-5 4 5 4m18-8 5 4-5 4m-5-11-4 14" fill="none" stroke="#087ca0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-28 10h48l12 15q2 4-3 4h-50q-5 0-6-4Z" fill="#555a6e" />
          <path d="M-19 14h33l5 7h-35Z" fill="#303448" />
          <path d="M-4 23h12" stroke="#a9afbd" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g className="skills-card-bg__float skills-card-bg__float--calendar">
        <g transform="translate(141 92) rotate(-12)">
          <rect x="-19" y="-23" width="38" height="44" rx="3" fill="#fffdf8" />
          <path d="M-19-13h38" stroke="#c5d5d4" strokeWidth="2" />
          <path d="M-12-27v8m8-8v8m8-8v8m8-8v8" stroke="#7c8e96" strokeWidth="2" strokeLinecap="round" />
          {[-7, 1, 9].map((row) => (
            <g key={row} fill="#b7c8ca">
              {[-11, -3, 5, 13].map((column) => (
                <rect key={column} x={column - 2} y={row} width="3" height="3" rx="0.5" />
              ))}
            </g>
          ))}
          <path d="m-4 2 3 3 5-6" fill="none" stroke="#d76c4c" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g className="skills-card-bg__float skills-card-bg__float--bulb">
        <g transform="translate(206 64) rotate(-12)">
          <path d="M-9 9c0-7-8-10-8-21a17 17 0 0 1 34 0c0 11-8 14-8 21Z" fill="#f2b523" />
          <path d="m-5 8-2-18 7 5 7-5-2 18" fill="none" stroke="#fff0b0" strokeWidth="2" strokeLinejoin="round" />
          <path d="M-9 10H9v8q-9 9-18 0Z" fill="#535c67" />
          <path d="M-7 13H7m-13 5H6" stroke="#abb2b1" strokeWidth="2" strokeLinecap="round" />
          <path d="M0-36v-7m-18 13-5-6m-5 22h-8m54-16 5-6m5 22h8" fill="none" stroke="var(--skills-wheel)" strokeWidth="2" strokeLinecap="round" />
          <path d="M-10-17q2-6 8-7" fill="none" stroke="#ffe49a" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      <g className="skills-card-bg__float skills-card-bg__float--mail">
        <g transform="translate(277 61) rotate(10)">
          <rect x="-24" y="-15" width="48" height="31" rx="3" fill="#fffdf9" />
          <path d="m-22-12 22 17 22-17" fill="#e3e9e7" />
          <circle cx="23" cy="-15" r="7" fill="#c94f42" />
          <path d="M23-18v6" stroke="#fffdf9" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g className="skills-card-bg__float skills-card-bg__float--target">
        <g transform="translate(358 89) rotate(26)">
          <ellipse rx="18" ry="28" fill="#fcfaf4" stroke="#3a3f51" strokeWidth="2" />
          <ellipse rx="12" ry="21" fill="none" stroke="#c95247" strokeWidth="4" />
          <ellipse rx="5" ry="11" fill="none" stroke="#c95247" strokeWidth="3" />
          <path d="M0 0-35-34" stroke="#3a3f51" strokeWidth="3" strokeLinecap="round" />
          <path d="m-35-34-1-10 9 10-1 7Z" fill="#e3ad2d" />
        </g>
      </g>

      <g className="skills-card-bg__float skills-card-bg__float--clock">
        <g transform="translate(369 151) rotate(14)">
          <path d="m-13 18-4 7m30-7 4 7M-9-25l-5-5m23 5 5-5" stroke="#53514c" strokeWidth="3" strokeLinecap="round" />
          <path d="M-24-15q0-15 15-12m18 0q15-3 15 12" fill="#d77545" />
          <circle r="22" fill="#d76b43" />
          <circle r="18" fill="#fffcf4" />
          <path d="M0-15v3m15 12h-3M0 15v-3m-15-12h3" stroke="#59616c" strokeWidth="2" />
          <path d="M0-10V0l8 5" fill="none" stroke="#394358" strokeWidth="2" strokeLinecap="round" />
          <circle r="2" fill="#d76b43" />
        </g>
      </g>
    </svg>
  </div>
)

export default SkillsCardMotionBackground
