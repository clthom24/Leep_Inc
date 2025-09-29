// =============================================
// File: src/components/common/StarBorder/StarBorder.jsx
// Purpose: Animated gradient-border wrapper for any element (button/link/div)
// Usage: <StarBorder as="a" href="/signup" className={styles.primaryBtn}>Sign Up</StarBorder>
// Props:
//  - as: tag/component to render (default 'button')
//  - color: gradient dot color (default uses --brand)
//  - speed: animation duration (e.g., '6s')
//  - thickness: border thickness in px (number)
//  - className: extra classes applied to OUTER wrapper (e.g., primaryBtn)
// =============================================
// src/components/common/StarBorder/StarBorder.jsx (or your path)
import cls from "./styles/StarBorder.module.css"; // adjust if your css file is elsewhere

export default function StarBorder({
  as: Component = "button",
  className = "",              // <-- now applied to the INNER span
  color = "var(--brand, #4fc3f7)",
  speed = "6s",
  thickness = 2,
  children,
  style,
  ...rest
}) {
  const cssVars = {
    "--sb-color": color,
    "--sb-speed": speed,
    "--sb-thickness": `${thickness}px`,
    ...style,
  };

  return (
    <Component className={cls.container} style={cssVars} {...rest}>
      <span className={cls.gradBottom} aria-hidden />
      <span className={cls.gradTop} aria-hidden />
      {/* 👇 Put your button class here so padding/font-size take effect */}
      <span className={`${cls.inner} ${className}`}>{children}</span>
    </Component>
  );
}