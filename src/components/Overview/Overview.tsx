import { ReactElement } from 'react';
import { PageNode } from 'src/directory/directory';
import { Card, Flex, Grid, View, Text } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';

type OverviewProps = {
  childPageNodes: PageNode[];
};

export function Overview({ childPageNodes }: OverviewProps) {
  const router = useRouter();
  const currentPlatform = router.query.platform as Platform;

  if (!childPageNodes) {
    return <></>;
  }

  return (
    <Grid className="overview">
      {childPageNodes
        .filter((node) => node.platforms.includes(currentPlatform))
        .map((node) => (
          <Link
            key={node.route}
            className="overview__link"
            href={{
              pathname: node.route,
              query: { platform: currentPlatform }
            }}
          >
            <Card className="overview__link__card" variation="outlined">
              <Flex direction="column">
                <Text className="overview__link__card__title">
                  {node.title}
                </Text>
                <View className="overview__link__card__description">
                  {node.description}
                </View>
              </Flex>
            </Card>
          </Link>
        ))}
    </Grid>
  );
}
