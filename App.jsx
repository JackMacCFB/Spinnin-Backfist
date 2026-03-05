import { useState, useEffect, useCallback } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
// Replace these with your project values from supabase.com → Project Settings → API
const SUPABASE_URL = "https://plqatalketnmkniybjpq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__HBMVQzUAhpLuPUwkarmBA_ueSpv4PF";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "ufc326", name: "UFC 326", subtitle: "Holloway vs. Oliveira 2",
    date: "March 7, 2026", venue: "T-Mobile Arena, Las Vegas NV",
    broadcast: "Paramount+ / CBS", status: "upcoming",
    fights: [
      { id: 1, section: "MAIN EVENT", fighter1: "Max Holloway", fighter2: "Charles Oliveira", record1: "27-8", record2: "36-11", weightClass: "Lightweight", lbs: 155, note: "BMF Title on the Line", belt: true, bio1: "Current BMF champion & former featherweight king", bio2: "Former lightweight champion, most finishes in UFC history" },
      { id: 2, section: "CO-MAIN EVENT", fighter1: "Caio Borralho", fighter2: "Reinier de Ridder", record1: "17-2", record2: "17-2", weightClass: "Middleweight", lbs: 185, note: "Both bouncing back from first losses", bio1: "Brazilian contender on a 7-fight win streak before first loss", bio2: "Dutch submission specialist, former ONE champion" },
      { id: 3, section: "MAIN CARD", fighter1: "Rob Font", fighter2: "Raul Rosas Jr.", record1: "21-8", record2: "10-1", weightClass: "Bantamweight", lbs: 135, note: "Veteran vs. rising prodigy", bio1: "Top-10 bantamweight veteran", bio2: "20-year-old phenom on 4-fight win streak" },
      { id: 4, section: "MAIN CARD", fighter1: "Drew Dober", fighter2: "Michael Johnson", record1: "28-15", record2: "24-19", weightClass: "Lightweight", lbs: 155, note: "30+ combined career KOs", bio1: "Banger back on track", bio2: "The Menace on 3-fight win streak" },
      { id: 5, section: "MAIN CARD", fighter1: "Gregory Rodrigues", fighter2: "Brunno Ferreira", record1: "16-4", record2: "11-1", weightClass: "Middleweight", lbs: 185, note: "All-Brazilian war", bio1: "Electric finisher, 2 straight wins", bio2: "Unbeaten in UFC" },
      { id: 6, section: "PRELIMS", fighter1: "Cody Garbrandt", fighter2: "Long Xiao", record1: "13-6", record2: "16-3", weightClass: "Bantamweight", lbs: 135, note: "Former champion seeks redemption", bio1: "Former UFC bantamweight champion", bio2: "Chinese prospect with serious power" },
      { id: 7, section: "PRELIMS", fighter1: "Donte Johnson", fighter2: "Cody Brundage", record1: "7-0", record2: "12-5", weightClass: "Middleweight", lbs: 185, note: "Undefeated prospect vs. veteran", bio1: "UFC debut, undefeated", bio2: "UFC vet on short notice" },
      { id: 8, section: "PRELIMS", fighter1: "Alberto Montes", fighter2: "Ricky Turcios", record1: "10-1", record2: "12-2", weightClass: "Featherweight", lbs: 145, note: "Featherweight action bout", bio1: "Rising contender", bio2: "High-octane action fighter" },
      { id: 9, section: "PRELIMS", fighter1: "Cody Durden", fighter2: "Nyamjargal Tumendemberel", record1: "16-5-1", record2: "16-3", weightClass: "Flyweight", lbs: 125, note: "Flyweight showdown", bio1: "Durable veteran", bio2: "Mongolian striker" },
      { id: 10, section: "EARLY PRELIMS", fighter1: "Sumudaerji", fighter2: "Jesus Aguilar", record1: "17-5", record2: "9-4", weightClass: "Flyweight", lbs: 125, note: "Flyweight action", bio1: "Chinese fan favorite 'Flash'", bio2: "Mexican slugger" },
      { id: 11, section: "EARLY PRELIMS", fighter1: "Rafael Tobias", fighter2: "Diyar Nurgozhay", record1: "8-1", record2: "9-3", weightClass: "Light Heavyweight", lbs: 205, note: "Light heavyweight contest", bio1: "Brazilian prospect", bio2: "Kazakhstani contender" },
      { id: 12, section: "EARLY PRELIMS", fighter1: "Gaston Bolanos", fighter2: "Jeong Yeong Lee", record1: "10-4", record2: "8-3", weightClass: "Featherweight", lbs: 145, note: "Featherweight scrap", bio1: "Ecuadorian featherweight", bio2: "South Korean fighter" },
      { id: 13, section: "EARLY PRELIMS", fighter1: "Luke Fernandez", fighter2: "Rodolfo Bellato", record1: "9-1", record2: "10-3", weightClass: "Light Heavyweight", lbs: 205, note: "Light heavyweight bout", bio1: "Australian prospect", bio2: "Brazilian contender" },
    ],
  },
  {
    id: "ufc325", name: "UFC 325", subtitle: "Pantoja vs. Royval 2",
    date: "February 1, 2026", venue: "Kaseya Center, Miami FL",
    broadcast: "Paramount+", status: "past",
    fights: [
      { id: 101, section: "MAIN EVENT", fighter1: "Alexandre Pantoja", fighter2: "Brandon Royval", record1: "28-5", record2: "16-6", weightClass: "Flyweight", lbs: 125, note: "Flyweight title rematch", belt: true, bio1: "UFC Flyweight Champion", bio2: "Action fighter seeking revenge" },
      { id: 102, section: "CO-MAIN EVENT", fighter1: "Magomed Ankalaev", fighter2: "Jamahal Hill", record1: "20-1-1", record2: "13-2", weightClass: "Light Heavyweight", lbs: 205, note: "Top-5 light heavyweight clash", bio1: "Russian powerhouse", bio2: "Former light heavyweight champion" },
      { id: 103, section: "MAIN CARD", fighter1: "Tatiana Suarez", fighter2: "Tracy Cortez", record1: "10-0", record2: "10-1", weightClass: "Women's Flyweight", lbs: 125, note: "Undefeated vs. contender", bio1: "Wrestling phenom", bio2: "Rising contender" },
      { id: 104, section: "MAIN CARD", fighter1: "Kevin Holland", fighter2: "Michael Morales", record1: "26-11", record2: "17-0", weightClass: "Welterweight", lbs: 170, note: "Veteran vs. unbeaten prospect", bio1: "'Trailblazer'", bio2: "Undefeated Ecuadorian" },
      { id: 105, section: "PRELIMS", fighter1: "Charles Jourdain", fighter2: "Dan Ige", record1: "16-7-1", record2: "17-8", weightClass: "Featherweight", lbs: 145, note: "Guaranteed action", bio1: "Canadian fan favorite", bio2: "Hawaiian brawler" },
    ],
  },
  {
    id: "ufcvegas123", name: "UFC Vegas 123", subtitle: "Whittaker vs. Chimaev",
    date: "January 18, 2026", venue: "UFC Apex, Las Vegas NV",
    broadcast: "ESPN+", status: "past",
    fights: [
      { id: 201, section: "MAIN EVENT", fighter1: "Robert Whittaker", fighter2: "Khamzat Chimaev", record1: "25-7", record2: "13-0", weightClass: "Middleweight", lbs: 185, note: "Bobby Knuckles vs. the undefeated Borz", bio1: "Former UFC middleweight champion", bio2: "Undefeated Chechen wrestling machine" },
      { id: 202, section: "CO-MAIN EVENT", fighter1: "Cub Swanson", fighter2: "Lerone Murphy", record1: "30-14", record2: "13-0-1", weightClass: "Featherweight", lbs: 145, note: "Veteran vs. unbeaten contender", bio1: "Fan favourite veteran", bio2: "Unbeaten British prospect" },
      { id: 203, section: "MAIN CARD", fighter1: "Lando Vannata", fighter2: "Terrance McKinney", record1: "13-6-2", record2: "13-5", weightClass: "Lightweight", lbs: 155, note: "Pure chaos energy", bio1: "Highlight reel artist", bio2: "T-Wrecks, always goes for the finish" },
      { id: 204, section: "PRELIMS", fighter1: "Davey Grant", fighter2: "Johnny Munoz", record1: "16-7", record2: "13-3", weightClass: "Bantamweight", lbs: 135, note: "Prelim banger", bio1: "British knockout artist", bio2: "California contender" },
    ],
  },
];

const SECTION_ORDER = ["MAIN EVENT", "CO-MAIN EVENT", "MAIN CARD", "PRELIMS", "EARLY PRELIMS"];
const SECTION_COLORS = { "MAIN EVENT": "#e8c840", "CO-MAIN EVENT": "#e08030", "MAIN CARD": "#6090e0", "PRELIMS": "#90b070", "EARLY PRELIMS": "#888" };
const CARD_VERDICTS = ["", "💀 Skip it", "😐 Forgettable", "👍 Solid card", "🔥 Great night of fights", "🐐 Card of the Year contender"];
const FIGHT_VERDICTS = ["", "💀 Forgettable", "😐 Meh", "👍 Decent scrap", "🔥 Banger", "🐐 Fight of the Year candidate"];

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
const C = { gold: "#e8c840", bg: "#080808", surface: "#111", border: "#1e1e1e", muted: "#555", dim: "#333" };

function StarRating({ value, onChange, size = "md" }) {
  const [hover, setHover] = useState(0);
  const sz = { xl: "36px", lg: "28px", md: "20px", sm: "15px" }[size] || "20px";
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} onClick={e => { e.stopPropagation(); onChange?.(s); }}
          onMouseEnter={() => onChange && setHover(s)} onMouseLeave={() => setHover(0)}
          style={{ fontSize: sz, background: "none", border: "none", padding: 0, cursor: onChange ? "pointer" : "default", color: s <= (hover || value) ? C.gold : "#252525", textShadow: s <= (hover || value) ? "0 0 12px rgba(232,200,64,0.7)" : "none", transform: hover === s && onChange ? "scale(1.2)" : "scale(1)", transition: "all 0.1s" }}>★</button>
      ))}
    </div>
  );
}

function SectionBadge({ section }) {
  return <span style={{ border: `1px solid ${SECTION_COLORS[section]}`, color: SECTION_COLORS[section], fontSize: "9px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "2px", padding: "2px 7px", borderRadius: "2px" }}>{section}</span>;
}

function Input({ label, type = "text", value, onChange, placeholder, error }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      {label && <div style={{ color: C.muted, fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "6px" }}>{label}</div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: "#0d0d0d", border: `1px solid ${error ? "#e05050" : "#2a2a2a"}`, borderRadius: "2px", color: "#ccc", fontFamily: "monospace", fontSize: "13px", padding: "10px 12px", outline: "none", boxSizing: "border-box" }} />
      {error && <div style={{ color: "#e05050", fontSize: "10px", marginTop: "4px", fontFamily: "monospace" }}>{error}</div>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", disabled, style = {} }) {
  const styles = {
    primary: { background: C.gold, color: "#000", border: "none" },
    secondary: { background: "none", color: C.muted, border: "1px solid #2a2a2a" },
    danger: { background: "none", color: "#e05050", border: "1px solid #e05050" },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...styles[variant], padding: "9px 22px", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "2px", cursor: disabled ? "not-allowed" : "pointer", borderRadius: "2px", opacity: disabled ? 0.5 : 1, transition: "opacity 0.15s", ...style }}>
      {children}
    </button>
  );
}

// ─── AUTH SCREENS ─────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return setError("Please fill in all fields.");
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) return setError(err.message);
    onAuth(data.user);
  };

  const handleSignup = async () => {
    if (!email || !password || !username) return setError("Email, password and username are required.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return setError("Username can only contain letters, numbers and underscores.");
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { username: username.toLowerCase(), display_name: displayName || username } }
    });
    setLoading(false);
    if (err) return setError(err.message);
    setSuccess("Account created! Check your email to confirm, then log in.");
    setMode("login");
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ marginBottom: "36px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🥋</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", fontWeight: 800, letterSpacing: "4px", color: C.gold }}>SPINNIN BACKFIST</div>
        <div style={{ color: C.muted, fontSize: "11px", fontFamily: "monospace", letterSpacing: "2px", marginTop: "4px" }}>RATE EVERY FIGHT · EVERY CARD</div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "28px", width: "100%", maxWidth: "380px" }}>
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
          {[["login", "LOG IN"], ["signup", "SIGN UP"]].map(([v, label]) => (
            <button key={v} onClick={() => { setMode(v); setError(""); setSuccess(""); }}
              style={{ flex: 1, padding: "8px", background: mode === v ? C.gold : "none", color: mode === v ? "#000" : C.muted, border: `1px solid ${mode === v ? C.gold : "#252525"}`, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", borderRadius: "2px", fontWeight: mode === v ? 700 : 400 }}>
              {label}
            </button>
          ))}
        </div>

        {success && <div style={{ background: "#0d1f0d", border: "1px solid #2a5a2a", borderRadius: "2px", color: "#6ae06a", fontSize: "11px", fontFamily: "monospace", padding: "10px", marginBottom: "14px" }}>{success}</div>}
        {error && <div style={{ background: "#1f0d0d", border: "1px solid #5a2a2a", borderRadius: "2px", color: "#e06060", fontSize: "11px", fontFamily: "monospace", padding: "10px", marginBottom: "14px" }}>{error}</div>}

        <Input label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Input label="PASSWORD" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
        {mode === "signup" && <>
          <Input label="USERNAME" value={username} onChange={setUsername} placeholder="mcgregor_fan" />
          <Input label="DISPLAY NAME (optional)" value={displayName} onChange={setDisplayName} placeholder="Conor's #1 Fan" />
        </>}

        <Btn onClick={mode === "login" ? handleLogin : handleSignup} disabled={loading} style={{ width: "100%", marginTop: "4px" }}>
          {loading ? "..." : mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
        </Btn>
      </div>
    </div>
  );
}

// ─── PROFILE VIEW ─────────────────────────────────────────────────────────────
function ProfileView({ user, profile, onSave, onSignOut, allCardRatings, allFightRatings }) {
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [favFighter, setFavFighter] = useState(profile?.favorite_fighter || "");
  const [saving, setSaving] = useState(false);

  const totalFightRatings = Object.values(allFightRatings).reduce((sum, obj) => sum + Object.keys(obj || {}).length, 0);
  const totalCardRatings = Object.keys(allCardRatings).length;
  const allStars = Object.values(allFightRatings).flatMap(obj => Object.values(obj || {}));
  const avgFight = allStars.length ? (allStars.reduce((a, b) => a + b, 0) / allStars.length).toFixed(1) : "—";
  const cardStars = Object.values(allCardRatings);
  const avgCard = cardStars.length ? (cardStars.reduce((a, b) => a + b, 0) / cardStars.length).toFixed(1) : "—";

  // Top-rated fights across all events
  const topFights = EVENTS.flatMap(e =>
    e.fights.map(f => ({ fight: f, event: e, stars: allFightRatings[e.id]?.[f.id] }))
  ).filter(x => x.stars).sort((a, b) => b.stars - a.stars).slice(0, 5);

  const handleSave = async () => {
    setSaving(true);
    await onSave({ display_name: displayName, bio, favorite_fighter: favFighter });
    setSaving(false);
    setEditing(false);
  };

  return (
    <div>
      {/* Profile header */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "24px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #e8c840, #c8a820)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: "#000", flexShrink: 0 }}>
              {(profile?.display_name || profile?.username || "?")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>{profile?.display_name || profile?.username}</div>
              <div style={{ color: C.muted, fontSize: "11px", fontFamily: "monospace" }}>@{profile?.username}</div>
              {profile?.favorite_fighter && <div style={{ color: "#888", fontSize: "10px", fontFamily: "monospace", marginTop: "2px" }}>🥊 Fav: {profile.favorite_fighter}</div>}
              {profile?.bio && <div style={{ color: "#777", fontSize: "11px", fontFamily: "monospace", marginTop: "4px", fontStyle: "italic" }}>"{profile.bio}"</div>}
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <Btn variant="secondary" onClick={() => setEditing(!editing)}>EDIT PROFILE</Btn>
            <Btn variant="danger" onClick={onSignOut}>SIGN OUT</Btn>
          </div>
        </div>

        {/* Edit form */}
        {editing && (
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "16px", marginTop: "4px" }}>
            <Input label="DISPLAY NAME" value={displayName} onChange={setDisplayName} placeholder="Your name" />
            <Input label="FAVORITE FIGHTER" value={favFighter} onChange={setFavFighter} placeholder="e.g. Max Holloway" />
            <div style={{ marginBottom: "14px" }}>
              <div style={{ color: C.muted, fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "6px" }}>BIO</div>
              <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell the world about your MMA taste..."
                style={{ width: "100%", minHeight: "64px", background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: "2px", color: "#ccc", fontFamily: "monospace", fontSize: "12px", padding: "9px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Btn onClick={handleSave} disabled={saving}>{saving ? "SAVING..." : "SAVE"}</Btn>
              <Btn variant="secondary" onClick={() => setEditing(false)}>CANCEL</Btn>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "8px", marginBottom: "20px" }}>
        {[
          { label: "FIGHTS RATED", val: totalFightRatings },
          { label: "CARDS RATED", val: totalCardRatings },
          { label: "AVG FIGHT", val: avgFight === "—" ? "—" : `${avgFight}★` },
          { label: "AVG CARD", val: avgCard === "—" ? "—" : `${avgCard}★` },
        ].map(s => (
          <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", padding: "12px", textAlign: "center" }}>
            <div style={{ color: "#444", fontSize: "9px", fontFamily: "monospace", letterSpacing: "1px" }}>{s.label}</div>
            <div style={{ color: C.gold, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "26px", fontWeight: 700 }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Top-rated fights */}
      {topFights.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{ fontSize: "14px" }}>⭐</span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "3px", color: C.gold }}>YOUR TOP-RATED FIGHTS</span>
            <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
          </div>
          {topFights.map(({ fight, event, stars }) => (
            <div key={`${event.id}-${fight.id}`} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "2px", padding: "10px 14px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "12px" }}>
              <StarRating value={stars} size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#fff", fontSize: "15px" }}>{fight.fighter1} <span style={{ color: C.muted }}>vs</span> {fight.fighter2}</div>
                <div style={{ color: "#444", fontSize: "10px", fontFamily: "monospace" }}>{event.name} · {fight.weightClass}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── FIGHT ROW / MODAL ────────────────────────────────────────────────────────
function FightRow({ fight, rating, onRate, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onOpen(fight)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "#161616" : C.surface, border: `1px solid ${hov ? SECTION_COLORS[fight.section] : C.border}`, borderRadius: "3px", padding: "13px 16px", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "3px", alignSelf: "stretch", background: SECTION_COLORS[fight.section], borderRadius: "2px", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "3px", flexWrap: "wrap" }}>
          <SectionBadge section={fight.section} />
          {fight.belt && <span>🏆</span>}
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px", fontWeight: 700, color: "#fff" }}>
          {fight.fighter1} <span style={{ color: C.gold, fontWeight: 400, fontSize: "13px" }}>vs</span> {fight.fighter2}
        </div>
        {fight.note && <div style={{ color: "#555", fontSize: "10px", fontFamily: "monospace", marginTop: "2px" }}>{fight.note}</div>}
      </div>
      <div style={{ textAlign: "center", flexShrink: 0, minWidth: "55px" }}>
        <div style={{ color: "#333", fontSize: "9px", fontFamily: "monospace" }}>{fight.lbs} lbs</div>
      </div>
      <div style={{ flexShrink: 0 }} onClick={e => e.stopPropagation()}>
        <StarRating value={rating || 0} onChange={r => onRate(fight.id, r)} size="md" />
      </div>
    </div>
  );
}

function FightModal({ fight, rating, onRate, onClose, review, onReview }) {
  const [draft, setDraft] = useState(review || "");
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(review || ""), [review]);
  if (!fight) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f0f", border: `1px solid ${SECTION_COLORS[fight.section]}`, borderRadius: "4px", maxWidth: "540px", width: "100%", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${SECTION_COLORS[fight.section]}, transparent)` }} />
        <div style={{ padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}><SectionBadge section={fight.section} />{fight.belt && <span style={{ color: C.gold, fontSize: "11px", fontFamily: "monospace" }}>🏆 TITLE FIGHT</span>}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{fight.fighter1}</div>
              <div style={{ color: C.gold, fontFamily: "monospace", fontSize: "11px", margin: "3px 0", letterSpacing: "2px" }}>VS</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{fight.fighter2}</div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, fontSize: "18px", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
            {[{ name: fight.fighter1, rec: fight.record1, bio: fight.bio1 }, { name: fight.fighter2, rec: fight.record2, bio: fight.bio2 }].map((f, i) => (
              <div key={i} style={{ background: "#141414", border: `1px solid ${C.border}`, borderRadius: "2px", padding: "9px" }}>
                <div style={{ color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", fontWeight: 600 }}>{f.name}</div>
                <div style={{ color: C.gold, fontFamily: "monospace", fontSize: "10px", margin: "2px 0" }}>{f.rec}</div>
                <div style={{ color: "#666", fontSize: "10px", lineHeight: 1.4 }}>{f.bio}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ color: C.muted, fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "8px" }}>YOUR RATING</div>
            <StarRating value={rating || 0} onChange={r => onRate(fight.id, r)} size="lg" />
            {rating > 0 && <div style={{ color: "#777", fontSize: "11px", fontFamily: "monospace", marginTop: "6px" }}>{FIGHT_VERDICTS[rating]}</div>}
          </div>
          <div>
            <div style={{ color: C.muted, fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "8px" }}>YOUR REVIEW</div>
            <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Leave your verdict..."
              style={{ width: "100%", minHeight: "68px", background: "#0a0a0a", border: `1px solid ${C.border}`, borderRadius: "2px", color: "#ccc", fontFamily: "monospace", fontSize: "12px", padding: "9px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
            <Btn onClick={() => { onReview(fight.id, draft); setSaved(true); setTimeout(() => setSaved(false), 1600); }} style={{ marginTop: "8px", background: saved ? "#1a3a1a" : C.gold, color: saved ? "#4ae84a" : "#000" }}>
              {saved ? "✓ SAVED" : "LOG REVIEW"}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CARD RATING WIDGET ───────────────────────────────────────────────────────
function CardRatingWidget({ cardRating, cardReview, onRate, onReview }) {
  const [draft, setDraft] = useState(cardReview || "");
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(cardReview || ""), [cardReview]);
  return (
    <div style={{ background: "linear-gradient(135deg, #141400, #0f0f0f)", border: "1px solid #2a2200", borderRadius: "4px", padding: "20px 22px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <span style={{ fontSize: "18px" }}>🃏</span>
        <div>
          <div style={{ color: C.gold, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "3px", fontWeight: 700 }}>RATE THIS CARD</div>
          <div style={{ color: C.muted, fontSize: "10px", fontFamily: "monospace" }}>How was the overall night of fights?</div>
        </div>
      </div>
      <StarRating value={cardRating || 0} onChange={onRate} size="xl" />
      {cardRating > 0 && <div style={{ color: "#888", fontSize: "12px", fontFamily: "monospace", marginTop: "8px" }}>{CARD_VERDICTS[cardRating]}</div>}
      <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Was it a top-to-bottom banger or a one-fight show? Leave your overall verdict..."
        style={{ marginTop: "14px", width: "100%", minHeight: "64px", background: "#0a0a0a", border: `1px solid ${C.border}`, borderRadius: "2px", color: "#ccc", fontFamily: "monospace", fontSize: "12px", padding: "9px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
      <Btn onClick={() => { onReview(draft); setSaved(true); setTimeout(() => setSaved(false), 1600); }} style={{ marginTop: "8px", background: saved ? "#1a3a1a" : C.gold, color: saved ? "#4ae84a" : "#000" }}>
        {saved ? "✓ SAVED" : "LOG CARD REVIEW"}
      </Btn>
    </div>
  );
}

// ─── EVENT DETAIL ─────────────────────────────────────────────────────────────
function EventDetailView({ event, fightRatings, cardRating, cardReview, fightReviews, onRateFight, onReviewFight, onRateCard, onReviewCard, onBack }) {
  const [selectedFight, setSelectedFight] = useState(null);
  const grouped = SECTION_ORDER.map(sec => ({ section: sec, fights: event.fights.filter(f => f.section === sec) })).filter(g => g.fights.length);
  const ratedFights = event.fights.filter(f => fightRatings[f.id]);
  const fightOfNight = ratedFights.length ? ratedFights.reduce((best, f) => fightRatings[f.id] > fightRatings[best.id] ? f : best) : null;

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, fontFamily: "monospace", fontSize: "11px", cursor: "pointer", padding: 0, marginBottom: "16px", letterSpacing: "1px" }}>← ALL EVENTS</button>
      <div style={{ marginBottom: "22px" }}>
        {event.status === "upcoming" && <span style={{ background: "#2a2200", color: C.gold, border: `1px solid ${C.gold}`, fontSize: "9px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "2px", padding: "2px 8px", borderRadius: "2px", marginBottom: "8px", display: "inline-block" }}>THIS SATURDAY</span>}
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(26px,5vw,44px)", fontWeight: 800, color: "#fff", margin: "6px 0 0", letterSpacing: "2px", lineHeight: 1 }}>{event.name}</h2>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px", color: C.gold, fontWeight: 600, marginTop: "2px" }}>{event.subtitle}</div>
        <div style={{ color: C.muted, fontSize: "11px", fontFamily: "monospace", marginTop: "4px" }}>{event.date} · {event.venue}</div>
      </div>

      <CardRatingWidget cardRating={cardRating} cardReview={cardReview} onRate={onRateCard} onReview={onReviewCard} />

      {fightOfNight && (
        <div style={{ background: C.surface, border: "1px solid #2a2200", borderRadius: "3px", padding: "12px 16px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span>⭐</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.gold, fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px" }}>YOUR FIGHT OF THE NIGHT</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", color: "#fff", marginTop: "2px" }}>{fightOfNight.fighter1} vs {fightOfNight.fighter2}</div>
          </div>
          <StarRating value={fightRatings[fightOfNight.id]} size="sm" />
        </div>
      )}

      {grouped.map(({ section, fights }) => (
        <div key={section} style={{ marginBottom: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ height: "1px", width: "16px", background: SECTION_COLORS[section] }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "3px", color: SECTION_COLORS[section] }}>{section}</span>
            <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {fights.map(f => <FightRow key={f.id} fight={f} rating={fightRatings[f.id]} onRate={onRateFight} onOpen={setSelectedFight} />)}
          </div>
        </div>
      ))}

      <FightModal fight={selectedFight} rating={selectedFight ? fightRatings[selectedFight.id] : 0}
        onRate={onRateFight} onClose={() => setSelectedFight(null)}
        review={selectedFight ? fightReviews[selectedFight.id] || "" : ""}
        onReview={onReviewFight} />
    </div>
  );
}

// ─── EVENTS HOME ──────────────────────────────────────────────────────────────
function EventsView({ allFightRatings, allCardRatings, allCardReviews, onOpenEvent }) {
  const getStats = (event) => {
    const vals = event.fights.map(f => allFightRatings[event.id]?.[f.id]).filter(Boolean);
    return { ratedCount: vals.length, avg: vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null };
  };

  const ranked = EVENTS.filter(e => allCardRatings[e.id]).sort((a, b) => allCardRatings[b.id] - allCardRatings[a.id]);
  const sorted = [...EVENTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {ranked.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span>🏆</span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "3px", color: C.gold }}>YOUR 2026 CARD LEADERBOARD</span>
            <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
          </div>
          {ranked.map((event, i) => (
            <div key={event.id} onClick={() => onOpenEvent(event.id)}
              style={{ background: i === 0 ? "linear-gradient(90deg, #1a1500, #111)" : C.surface, border: `1px solid ${i === 0 ? "#3a3000" : C.border}`, borderRadius: "3px", padding: "12px 16px", marginBottom: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = i === 0 ? "#3a3000" : C.border}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "24px", fontWeight: 800, color: i === 0 ? C.gold : C.dim, minWidth: "28px" }}>#{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px", color: "#fff", fontWeight: 700 }}>{event.name} <span style={{ color: C.muted, fontWeight: 400, fontSize: "14px" }}>— {event.subtitle}</span></div>
                <div style={{ color: C.muted, fontSize: "10px", fontFamily: "monospace" }}>{event.date}</div>
                {allCardReviews[event.id] && <div style={{ color: "#666", fontSize: "10px", fontFamily: "monospace", marginTop: "3px", fontStyle: "italic" }}>"{allCardReviews[event.id].slice(0, 80)}…"</div>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <StarRating value={allCardRatings[event.id]} size="sm" />
                <div style={{ color: "#555", fontSize: "9px", fontFamily: "monospace", marginTop: "2px" }}>{CARD_VERDICTS[allCardRatings[event.id]]}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div style={{ height: "1px", width: "16px", background: "#444" }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", letterSpacing: "3px", color: C.muted }}>ALL EVENTS — 2026</span>
        <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
      </div>

      {sorted.map(event => {
        const { ratedCount, avg } = getStats(event);
        const cardRating = allCardRatings[event.id];
        const isUpcoming = event.status === "upcoming";
        return (
          <div key={event.id} onClick={() => onOpenEvent(event.id)}
            style={{ background: C.surface, border: `1px solid ${isUpcoming ? "#2a2200" : C.border}`, borderRadius: "3px", padding: "15px 18px", marginBottom: "8px", cursor: "pointer", display: "flex", gap: "14px", alignItems: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = "#161616"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = isUpcoming ? "#2a2200" : C.border; e.currentTarget.style.background = C.surface; }}>
            <div style={{ flexShrink: 0, minWidth: "70px" }}>
              <div style={{ display: "inline-block", padding: "3px 8px", borderRadius: "2px", fontSize: "9px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "1px", fontWeight: 700, background: isUpcoming ? "#2a2200" : "#1a1a1a", color: isUpcoming ? C.gold : C.muted, border: `1px solid ${isUpcoming ? C.gold : "#2a2a2a"}` }}>
                {isUpcoming ? "THIS SAT" : "PAST"}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>{event.name}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", color: "#888" }}>{event.subtitle}</div>
              <div style={{ color: "#444", fontSize: "10px", fontFamily: "monospace", marginTop: "3px" }}>{event.date} · {event.venue}</div>
            </div>
            <div style={{ display: "flex", gap: "12px", flexShrink: 0, alignItems: "center" }}>
              {ratedCount > 0 && <div style={{ textAlign: "center" }}><div style={{ color: "#444", fontSize: "9px", fontFamily: "monospace" }}>FIGHTS</div><div style={{ color: "#888", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px" }}>{ratedCount}/{event.fights.length}</div></div>}
              {avg && <div style={{ textAlign: "center" }}><div style={{ color: "#444", fontSize: "9px", fontFamily: "monospace" }}>AVG</div><div style={{ color: C.gold, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700 }}>{avg}★</div></div>}
              {cardRating ? <div style={{ textAlign: "center" }}><div style={{ color: "#444", fontSize: "9px", fontFamily: "monospace" }}>CARD</div><StarRating value={cardRating} size="sm" /></div>
                : <div style={{ color: "#2a2a2a", fontSize: "11px", fontFamily: "monospace" }}>Unrated</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SpinninBackfist() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("events"); // events | profile
  const [activeEvent, setActiveEvent] = useState(null);

  // Per-user data loaded from Supabase
  const [allFightRatings, setAllFightRatings] = useState({});
  const [allFightReviews, setAllFightReviews] = useState({});
  const [allCardRatings, setAllCardRatings] = useState({});
  const [allCardReviews, setAllCardReviews] = useState({});

  // ── Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadUserData(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadUserData(session.user.id);
      else { setLoading(false); setProfile(null); setAllFightRatings({}); setAllCardRatings({}); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    setLoading(true);
    const [profileRes, fightRes, cardRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("fight_ratings").select("*").eq("user_id", userId),
      supabase.from("card_ratings").select("*").eq("user_id", userId),
    ]);
    if (profileRes.data) setProfile(profileRes.data);

    // Reshape fight ratings: { eventId: { fightId: stars } }
    const fr = {};
    const frv = {};
    (fightRes.data || []).forEach(r => {
      if (!fr[r.event_id]) fr[r.event_id] = {};
      if (!frv[r.event_id]) frv[r.event_id] = {};
      fr[r.event_id][r.fight_id] = r.stars;
      if (r.review) frv[r.event_id][r.fight_id] = r.review;
    });
    setAllFightRatings(fr);
    setAllFightReviews(frv);

    const cr = {};
    const crv = {};
    (cardRes.data || []).forEach(r => {
      cr[r.event_id] = r.stars;
      if (r.review) crv[r.event_id] = r.review;
    });
    setAllCardRatings(cr);
    setAllCardReviews(crv);
    setLoading(false);
  };

  const handleRateFight = async (eventId, fightId, stars) => {
    const userId = session.user.id;
    setAllFightRatings(prev => ({ ...prev, [eventId]: { ...(prev[eventId] || {}), [fightId]: stars } }));
    await supabase.from("fight_ratings").upsert({ user_id: userId, event_id: eventId, fight_id: fightId, stars, updated_at: new Date().toISOString() }, { onConflict: "user_id,event_id,fight_id" });
  };

  const handleReviewFight = async (eventId, fightId, review) => {
    const userId = session.user.id;
    setAllFightReviews(prev => ({ ...prev, [eventId]: { ...(prev[eventId] || {}), [fightId]: review } }));
    const existing = allFightRatings[eventId]?.[fightId];
    if (existing) await supabase.from("fight_ratings").upsert({ user_id: userId, event_id: eventId, fight_id: fightId, stars: existing, review, updated_at: new Date().toISOString() }, { onConflict: "user_id,event_id,fight_id" });
  };

  const handleRateCard = async (eventId, stars) => {
    const userId = session.user.id;
    setAllCardRatings(prev => ({ ...prev, [eventId]: stars }));
    await supabase.from("card_ratings").upsert({ user_id: userId, event_id: eventId, stars, updated_at: new Date().toISOString() }, { onConflict: "user_id,event_id" });
  };

  const handleReviewCard = async (eventId, review) => {
    const userId = session.user.id;
    setAllCardReviews(prev => ({ ...prev, [eventId]: review }));
    const existing = allCardRatings[eventId];
    if (existing) await supabase.from("card_ratings").upsert({ user_id: userId, event_id: eventId, stars: existing, review, updated_at: new Date().toISOString() }, { onConflict: "user_id,event_id" });
  };

  const handleUpdateProfile = async (updates) => {
    const { data } = await supabase.from("profiles").update(updates).eq("id", session.user.id).select().single();
    if (data) setProfile(data);
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); setTab("events"); setActiveEvent(null); };

  // Not configured yet
  if (SUPABASE_URL === "YOUR_SUPABASE_URL") {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "monospace" }}>
          <div style={{ background: C.surface, border: "1px solid #2a2200", borderRadius: "4px", padding: "32px", maxWidth: "500px", width: "100%" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px", textAlign: "center" }}>🥋</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 800, color: C.gold, letterSpacing: "3px", textAlign: "center", marginBottom: "20px" }}>SETUP REQUIRED</div>
            <div style={{ color: "#888", fontSize: "12px", lineHeight: 1.8, marginBottom: "20px" }}>
              To connect this app to Supabase, replace the two placeholders at the top of this file:
            </div>
            {[["SUPABASE_URL", "Project Settings → API → Project URL"], ["SUPABASE_ANON_KEY", "Project Settings → API → anon / public key"]].map(([key, hint]) => (
              <div key={key} style={{ background: "#0d0d0d", border: `1px solid ${C.border}`, borderRadius: "2px", padding: "10px 14px", marginBottom: "8px" }}>
                <div style={{ color: C.gold, fontSize: "11px", letterSpacing: "1px" }}>{key}</div>
                <div style={{ color: "#555", fontSize: "10px", marginTop: "2px" }}>Found at: {hint}</div>
              </div>
            ))}
            <div style={{ color: "#555", fontSize: "11px", marginTop: "16px", lineHeight: 1.7 }}>
              1. Create a free account at <span style={{ color: C.gold }}>supabase.com</span><br />
              2. Create a new project<br />
              3. Go to SQL Editor and run the <span style={{ color: C.gold }}>schema.sql</span> file<br />
              4. Paste your URL and anon key above
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!session) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <AuthScreen onAuth={() => {}} />
    </>
  );

  if (loading) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: C.muted, fontFamily: "monospace", fontSize: "12px", letterSpacing: "2px" }}>LOADING...</div>
      </div>
    </>
  );

  const currentEvent = activeEvent ? EVENTS.find(e => e.id === activeEvent) : null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: C.bg, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>

        {/* Nav */}
        <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => { setTab("events"); setActiveEvent(null); }} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>🥋</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", letterSpacing: "3px", color: C.gold, fontWeight: 700 }}>SPINNIN BACKFIST</span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Avatar / profile button */}
              <button onClick={() => { setTab("profile"); setActiveEvent(null); }}
                style={{ width: "32px", height: "32px", borderRadius: "50%", background: tab === "profile" ? C.gold : "#1a1a1a", border: `1px solid ${tab === "profile" ? C.gold : "#2a2a2a"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "13px", color: tab === "profile" ? "#000" : "#888" }}>
                {(profile?.display_name || profile?.username || "?")[0].toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "28px 20px" }}>
          {tab === "profile" ? (
            <ProfileView user={session.user} profile={profile} onSave={handleUpdateProfile} onSignOut={handleSignOut} allCardRatings={allCardRatings} allFightRatings={allFightRatings} />
          ) : currentEvent ? (
            <EventDetailView
              event={currentEvent}
              fightRatings={allFightRatings[currentEvent.id] || {}}
              cardRating={allCardRatings[currentEvent.id]}
              cardReview={allCardReviews[currentEvent.id]}
              fightReviews={allFightReviews[currentEvent.id] || {}}
              onRateFight={(fightId, stars) => handleRateFight(currentEvent.id, fightId, stars)}
              onReviewFight={(fightId, text) => handleReviewFight(currentEvent.id, fightId, text)}
              onRateCard={(stars) => handleRateCard(currentEvent.id, stars)}
              onReviewCard={(text) => handleReviewCard(currentEvent.id, text)}
              onBack={() => setActiveEvent(null)}
            />
          ) : (
            <EventsView allFightRatings={allFightRatings} allCardRatings={allCardRatings} allCardReviews={allCardReviews} onOpenEvent={id => { setActiveEvent(id); setTab("events"); }} />
          )}
        </div>
      </div>
    </>
  );
}
