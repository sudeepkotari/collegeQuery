import { HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import localStorage from "local-storage";
import { useState } from "react";

function UserInfo() {
  const [user, setUser] = useState({
    name: "",
    about: "",
    profile: "",
  });

  const userId = localStorage.get("userId");

  const [getUser, { data }] = useLazyQuery(GET_USER, {
    variables: {
      id: userId,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      setUser({
        name: data.getUser.name,
        about: data.getUser.about,
        profileUrl: data.getUser.profileUrl,
      });
    }
  }, [data]);

  return (
    <VStack mb="50">
      <HStack mt="50">
        <Avatar
          src={user.profileUrl}
          w={{
            base: "70px",
            md: "150px",
          }}
          h={{
            base: "70px",
            md: "150px",
          }}
        />
        <Spacer />
        <VStack>
          <Text
            as="b"
            fontSize={{
              base: "sm",
              sm: "medium",
              md: "x-large",
            }}
          >
            {user.name}
          </Text>
          <Text
            fontSize={{
              base: "x-small",
              sm: "sm",
              md: "medium",
            }}
          >
            {user.about}
          </Text>
          <HStack>
            <Link to="/logout">
              <Button variant="outline" size="sm">
                logout
              </Button>
            </Link>
            <Link to="/editprofile">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default UserInfo;
