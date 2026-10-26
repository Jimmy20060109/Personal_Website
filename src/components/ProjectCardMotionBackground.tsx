import { useId, useMemo } from 'react'
import './ProjectCardMotionBackground.css'

type Node = {
  x: number
  y: number
  r: number
  delay: number
  duration: number
}

type Link = {
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}

const codeSnippet = `const network = init({ nodes: 24, depth: 4 })
for (const node of network.nodes) {
  node.connect(network.nearest(node, 3))
  node.pulse({ interval: '420ms' })
}
if (renderer.ready) {
  renderer.draw(network)
  return network.toJSON()
}`

const binaryStream = ['10110100', '01001011', '11010010', '00111101', '10011010']

const metrics = [
  { tone: 'red', name: 'Fountain', value: '10+ screens', status: 'Live' },
  { tone: 'blue', name: 'VolunTrack', value: '< 2s search', status: 'Shipped' },
  { tone: 'green', name: 'Portfolio', value: '300+ images', status: 'Live' },
  { tone: 'pink', name: 'RAG API', value: '3 endpoints', status: 'Healthy' },
  { tone: 'purple', name: 'Simon', value: '4 pads', status: 'Live' },
  { tone: 'cyan', name: 'Keeper', value: 'React Hooks', status: 'Live' },
  { tone: 'violet', name: 'Flutter UI', value: 'iOS / Android', status: 'Synced' },
  { tone: 'coral', name: 'Tests', value: '15+ bugs', status: 'Caught' },
  { tone: 'lilac', name: 'Drag & Drop', value: 'Interact.js', status: 'Active' },
  { tone: 'indigo', name: 'Deploy', value: 'Vercel', status: 'Ready' },
]

// Tiny seedable PRNG so node positions are stable across renders & SSR.
const createRandom = (seed: number) => {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const buildNetwork = () => {
  const random = createRandom(11)
  const N = 14
  const nodes: Node[] = []

  for (let i = 0; i < N; i++) {
    // Bias toward the right half so it mirrors the reference image, but keep
    // a few nodes scattered through the rest of the canvas for balance.
    const biasRight = i % 4 !== 0
    const x = biasRight ? 360 + random() * 420 : 60 + random() * 320
    const y = 30 + random() * 230
    nodes.push({
      x,
      y,
      r: 1.6 + random() * 1.4,
      delay: random() * 4,
      duration: 2.6 + random() * 2.2,
    })
  }

  const seen = new Set<string>()
  const links: Link[] = []
  for (let i = 0; i < nodes.length; i++) {
    const neighbours = nodes
      .map((n, j) => ({
        j,
        d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y),
      }))
      .filter((n) => n.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)

    for (const n of neighbours) {
      const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      links.push({
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[n.j].x,
        y2: nodes[n.j].y,
        delay: random() * 3,
      })
    }
  }

  return { nodes, links }
}

const ProjectCardMotionBackground = () => {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '')

  const { nodes, links } = useMemo(buildNetwork, [])

  const gridFadeId = `pcb-grid-fade-${uid}`
  const nodeGlowId = `pcb-node-glow-${uid}`

  // Perspective floor: vertical lines all converge to the vanishing point
  // at (400, 200). Horizontal lines are spaced exponentially so they bunch
  // up near the horizon, giving a true "Tron grid" feel.
  const vanishX = 400
  const horizonY = 200
  const floorY = 400
  const verticals = [-700, -400, -180, 0, 180, 320, 400, 480, 620, 800, 980, 1200, 1500]
  const horizontals = [202, 210, 222, 240, 266, 302, 348, 400]

  return (
    <div className="project-card-bg" aria-hidden="true">
      <div className="project-card-bg__dashboard">
        <div className="project-card-bg__topbar">
          <span className="project-card-bg__logo"><i /><i /><i /></span>
          <span className="project-card-bg__nav-text project-card-bg__nav-text--active">Dashboard</span>
          <span className="project-card-bg__nav-text">Projects</span>
          <span className="project-card-bg__nav-text">Builds</span>
          <span className="project-card-bg__nav-text">Analytics</span>
          <span className="project-card-bg__search">Search projects…</span>
          <span className="project-card-bg__avatar" />
          <span className="project-card-bg__chevron" />
        </div>

        <div className="project-card-bg__toolbar">
          <span /><span /><span /><span /><span />
          <span className="project-card-bg__toolbar-spacer" />
          <span /><span /><span />
        </div>

        <div className="project-card-bg__alert">
          <strong>!</strong>
          <span className="project-card-bg__alert-text">
            <b>New release deployed</b>
            <small>Personal Website v2 is live on Vercel</small>
          </span>
          <span className="project-card-bg__alert-divider" />
          <span className="project-card-bg__alert-text project-card-bg__alert-text--right">
            <b>5 projects</b>
            <small>All systems operational</small>
          </span>
        </div>

        <div className="project-card-bg__section-title">Project overview</div>
        <div className="project-card-bg__metric-grid">
          {metrics.map(({ tone, name, value, status }) => (
            <span className={`project-card-bg__metric project-card-bg__metric--${tone}`} key={tone}>
              <i className="project-card-bg__metric-color" />
              <b className="project-card-bg__metric-name">{name}</b>
              <small className="project-card-bg__metric-value">{value}</small>
              <small className="project-card-bg__metric-status">● {status}</small>
              <i className="project-card-bg__metric-chart" />
            </span>
          ))}
        </div>
      </div>

      <div className="project-card-bg__layer project-card-bg__layer--code">
        <pre className="project-card-bg__code">{codeSnippet}</pre>
      </div>

      <div className="project-card-bg__layer project-card-bg__layer--binary">
        {binaryStream.map((line, i) => (
          <span
            key={line + i}
            className="project-card-bg__binary-line"
            style={{ animationDelay: `${i * 0.45}s` }}
          >
            {line}
          </span>
        ))}
      </div>

      <svg
        className="project-card-bg__svg"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMax slice"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gridFadeId}
            x1="0"
            y1={horizonY}
            x2="0"
            y2={floorY}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="35%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id={nodeGlowId}>
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g
          className="project-card-bg__grid"
          stroke={`url(#${gridFadeId})`}
          strokeWidth="0.6"
          fill="none"
        >
          {verticals.map((x, i) => (
            <line
              key={`v${i}`}
              x1={x}
              y1={floorY}
              x2={vanishX}
              y2={horizonY}
            />
          ))}
          {horizontals.map((y, i) => (
            <line key={`h${i}`} x1={0} y1={y} x2={800} y2={y} />
          ))}
        </g>

        <g className="project-card-bg__links">
          {links.map((link, i) => (
            <line
              key={`l${i}`}
              x1={link.x1}
              y1={link.y1}
              x2={link.x2}
              y2={link.y2}
              stroke="currentColor"
              strokeWidth="0.55"
              style={{ animationDelay: `${link.delay}s` }}
            />
          ))}
        </g>

        <g className="project-card-bg__nodes">
          {nodes.map((node, i) => (
            <g
              key={`n${i}`}
              className="project-card-bg__node"
              style={{
                animationDelay: `${node.delay}s`,
                animationDuration: `${node.duration}s`,
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r * 5}
                fill={`url(#${nodeGlowId})`}
                className="project-card-bg__node-glow"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="currentColor"
                className="project-card-bg__node-core"
              />
            </g>
          ))}
        </g>
      </svg>

      <span className="project-card-bg__corner project-card-bg__corner--tl" />
      <span className="project-card-bg__corner project-card-bg__corner--tr" />
      <span className="project-card-bg__corner project-card-bg__corner--bl" />
      <span className="project-card-bg__corner project-card-bg__corner--br" />

      <div className="project-card-bg__vignette" />
    </div>
  )
}

export default ProjectCardMotionBackground
