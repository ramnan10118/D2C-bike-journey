import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { ChevronLeft } from "lucide-react";

const LEARN_MORE_PHRASE = "Learn more";

export interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  /**
   * Optional line under the title (body-md). One string; the substring `Learn more` is rendered as `<a>`.
   */
  subtitle?: string;
  learnMoreHref?: string;
  onLearnMore?: () => void;
}

function HeaderSubtitleLine({
  text,
  learnMoreHref,
  onLearnMore,
}: {
  text: string;
  learnMoreHref?: string;
  onLearnMore?: () => void;
}) {
  const i = text.indexOf(LEARN_MORE_PHRASE);
  if (i === -1) {
    return (
      <Typography
        variant="body-md"
        color="secondary"
        weight="medium"
        as="p"
        className="mobile-header-plan-subtitle"
        style={{ margin: 0 }}
      >
        {text}
      </Typography>
    );
  }

  const before = text.slice(0, i);
  const after = text.slice(i + LEARN_MORE_PHRASE.length);

  return (
    <Typography
      variant="body-md"
      color="secondary"
      weight="medium"
      as="p"
      className="mobile-header-plan-subtitle"
      style={{ margin: 0 }}
    >
      {before}
      <a
        href={learnMoreHref ?? "#"}
        className="mobile-header-learn-more-inline"
        onClick={(e) => {
          if (onLearnMore) {
            e.preventDefault();
            onLearnMore();
          }
        }}
      >
        {LEARN_MORE_PHRASE}
      </a>
      {after}
    </Typography>
  );
}

export function MobileHeader({
  title,
  onBack,
  showBack,
  subtitle,
  learnMoreHref,
  onLearnMore,
}: MobileHeaderProps) {
  const backUi = Boolean(onBack) || Boolean(showBack);
  const backEnabled = Boolean(onBack);
  const trimmedSubtitle = subtitle?.trim();
  const hasSubtitle = Boolean(trimmedSubtitle);

  return (
    <header>
      <div style={{ paddingTop: "var(--space-4)" }}>
        <div className="flex items-center" style={{ minHeight: "var(--space-10)" }}>
          {backUi ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Back"
              disabled={!backEnabled}
              onClick={onBack}
              className="mobile-header-back"
              iconLeft={<ChevronLeft size={24} strokeWidth={2} aria-hidden />}
            >
              Back
            </Button>
          ) : (
            <span style={{ width: "var(--space-10)" }} aria-hidden />
          )}
        </div>
        <div
          className="mobile-header-divider-bleed"
          role="presentation"
          style={{
            marginTop: "var(--space-2)",
            borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
          }}
        />
      </div>

      <div style={{ marginTop: "var(--space-4)" }}>
        {hasSubtitle ? (
          <div className="flex w-full min-w-0 flex-col" style={{ gap: "var(--space-2)" }}>
            <Typography
              variant="heading-lg"
              color="primary"
              weight="bold"
              as="h1"
              className="min-w-0 shrink-0"
              style={{ margin: 0 }}
            >
              {title}
            </Typography>
            <div className="mobile-header-subtitle w-full min-w-0 shrink-0">
              <HeaderSubtitleLine
                text={trimmedSubtitle!}
                learnMoreHref={learnMoreHref}
                onLearnMore={onLearnMore}
              />
            </div>
          </div>
        ) : (
          <Typography
            variant="heading-lg"
            color="primary"
            weight="bold"
            as="h1"
            style={{ margin: 0 }}
          >
            {title}
          </Typography>
        )}
      </div>
    </header>
  );
}
