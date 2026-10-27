/**
 * A big version of the road strip on the left: asphalt with a double gold centre-line.
 * It sits behind the scene, centred on the pin. Its size and look live in globals.css ("Hero road").
 */
export function HeroRoad() {
    return (
      <div className="hero-road" aria-hidden="true">
        <span className="hero-road-line" />
        <span className="hero-road-line" />
      </div>
    );
  }