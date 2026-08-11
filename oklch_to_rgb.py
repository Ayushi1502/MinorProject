
import math
import sys

def oklch_to_rgb(L: float, C: float, H: float) -> tuple[int, int, int]:
    h_radians = math.radians(H)
    a = C * math.cos(h_radians)
    b = C * math.sin(h_radians)

    l_prime = L + 0.3963377774 * a + 0.2158037573 * b
    m_prime = L - 0.1055613423 * a - 0.0638541728 * b
    s_prime = L - 0.0894841775 * a - 1.2914855480 * b

    l = math.copysign(1, l_prime) * (abs(l_prime)**3)
    m = math.copysign(1, m_prime) * (abs(m_prime)**3)
    s = math.copysign(1, s_prime) * (abs(s_prime)**3)

    X = 1.2270343237 * l - 0.5577714991 * m + 0.2812560727 * s
    Y = -0.0405807074 * l + 1.1351344785 * m - 0.0945539441 * s
    Z = -0.0090986546 * l - 0.0505290970 * m + 1.2486018133 * s

    R_linear = 3.2406 * X - 1.5372 * Y - 0.4986 * Z
    G_linear = -0.9689 * X + 1.8758 * Y + 0.0415 * Z
    B_linear = 0.0557 * X - 0.2040 * Y + 1.0570 * Z

    def linear_to_srgb_component(c_linear: float) -> float:
        if c_linear <= 0.0031308:
            return c_linear * 12.92
        else:
            return 1.055 * (c_linear**(1/2.4)) - 0.055

    R_srgb = linear_to_srgb_component(R_linear)
    G_srgb = linear_to_srgb_component(G_linear)
    B_srgb = linear_to_srgb_component(B_linear)

    R = max(0, min(255, round(R_srgb * 255)))
    G = max(0, min(255, round(G_srgb * 255)))
    B = max(0, min(255, round(B_srgb * 255)))

    return (R, G, B)

if __name__ == "__main__":
    L = float(sys.argv[1])
    C = float(sys.argv[2])
    H = float(sys.argv[3])
    rgb = oklch_to_rgb(L, C, H)
    print(f"rgb({rgb[0]} {rgb[1]} {rgb[2]})")
