"use client";

import { Card } from "@acko/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acko/table";
import { Typography } from "@acko/typography";
import { Check, X } from "lucide-react";

const WHY_5_YEAR_POINTS = [
  "Effective September 2018, IRDAI has made a 5-year Third-party insurance plan mandatory for all brand new bikes.",
  "It covers damage caused by your bike to others and their property.",
] as const;

const COMPARISON_ROWS = [
  {
    feature: "Coverage against accidental damage",
    comprehensive: true,
    thirdParty: false,
  },
  {
    feature: "Fire, lightning & explosion",
    comprehensive: true,
    thirdParty: false,
  },
  { feature: "Theft", comprehensive: true, thirdParty: false },
  {
    feature: "Third-party property damage",
    comprehensive: true,
    thirdParty: true,
  },
  {
    feature: "Third-party injury or death",
    comprehensive: true,
    thirdParty: true,
  },
] as const;

function CoverageIcon({ covered }: { covered: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {covered ? (
        <Check
          size={18}
          strokeWidth={2.5}
          style={{ color: "var(--color-brand)" }}
        />
      ) : (
        <X
          size={18}
          strokeWidth={2.5}
          style={{ color: "var(--color-text-secondary)" }}
        />
      )}
    </div>
  );
}

export function WhyThirdParty5YearContent() {
  return (
    <div className="flex flex-col gap-[var(--space-5)]">
      {WHY_5_YEAR_POINTS.map((text, i) => (
        <div key={i} className="flex gap-[var(--space-4)]">
          <Typography
            variant="heading-md"
            color="primary"
            weight="bold"
            as="span"
            className="shrink-0"
          >
            {i + 1}.
          </Typography>
          <Typography variant="body-md" color="primary">
            {text}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function WhyComprehensiveContent() {
  return (
    <div className="flex flex-col gap-[var(--space-5)]">
      <Typography variant="body-md" color="primary">
        For just ₹23 more, Comprehensive Plan covers your own bike against
        damage, fire and theft — in addition to all Third-party liabilities.
      </Typography>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coverage</TableHead>
            <TableHead style={{ textAlign: "center" }}>Comprehensive</TableHead>
            <TableHead style={{ textAlign: "center" }}>Third-party</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {COMPARISON_ROWS.map((row) => (
            <TableRow key={row.feature}>
              <TableCell>
                <Typography variant="body-sm" color="primary">
                  {row.feature}
                </Typography>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <CoverageIcon covered={row.comprehensive} />
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <CoverageIcon covered={row.thirdParty} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card
        variant="demoted"
        padding="md"
        style={{ background: "var(--color-primary-subtle)" }}
      >
        <Typography variant="body-sm" color="primary">
          7 out of 10 ACKO customers choose Comprehensive Plan for complete
          protection of their bike.
        </Typography>
      </Card>
    </div>
  );
}
