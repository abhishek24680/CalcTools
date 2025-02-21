import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
import { CalculatorIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href; // ✅ Next.js equivalent of useLocation()

  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        color="inherit"
        startIcon={<Icon size={20} />}
        sx={{
          position: "relative",
          "&::after": isActive
            ? {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 8,
                right: 8,
                height: "3px",
                bgcolor: "white",
                borderRadius: "2px 2px 0 0",
              }
            : {},
          opacity: isActive ? 1 : 0.8,
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {children}
      </Button>
    </Link>
  );
};

function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <NavLink href="/" icon={HomeIcon}>
                Home
              </NavLink>
              <NavLink
                href="/8th-pay-commission-salary-calculator"
                icon={CalculatorIcon}
              >
                8th Pay Calculator
              </NavLink>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
