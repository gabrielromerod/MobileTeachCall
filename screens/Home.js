import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const API_URL = "http://192.168.3.7:8080";
const API_PREFIX = '/posts';
const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnYWJvbGFuZGlhMTU2QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX3N0dWRlbnQiLCJleHAiOjE3MDA4MDUwMDYsImlhdCI6MTcwMDc2OTAwNn0.Y9rg49bBVgQvZRWGjo_N0-1BI6OjkySN_kawRDaSjkU";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}${API_PREFIX}/feed?page=${page}&size=10`, {
          method: 'GET',
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(prevPosts => [...prevPosts, ...data.content]);
        setIsLastPage(data.last);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [page]);

  const loadMorePosts = () => {
    if (!isLastPage) {
      setPage(currentPage => currentPage + 1);
    }
  };

  const toggleLike = async (postId, liked) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    try {
      if (liked) {
        await fetch(`${API_URL}${API_PREFIX}/like/${postId}`, { method: 'DELETE', headers });
      } else {
        await fetch(`${API_URL}${API_PREFIX}/like/${postId}`, { method: 'POST', headers });
      }

      // Actualizar el estado de los posts
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, liked: !liked, likesQ: post.likesQ + (liked ? -1 : 1) } : post
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const PostCard = ({ id, title, body, firstName, lastName, createdAt, liked, likesQ }) => {
    const [isLiked, setIsLiked] = useState(liked);
    const [animationProgress, setAnimationProgress] = useState(new Animated.Value(0)); // Para controlar el progreso de la animación
  
    useEffect(() => {
      Animated.timing(animationProgress, {
        toValue: isLiked ? 1 : 0,  
        duration: 500,
        useNativeDriver: false
      }).start();
    }, [isLiked]);

    const handleLike = async () => {
      await toggleLike(id, isLiked);
      setIsLiked(!isLiked);
    };
  
    return (
      <View style={styles.postCard}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postBody}>{body}</Text>
        <View style={styles.postInfo}>
          <View style={styles.authorInfo}>
            <Text style={styles.postAuthor}>{firstName} {lastName}</Text>
            <Text style={styles.postDate}>{createdAt.split('T')[0]}</Text>
          </View>
          <View style={styles.likeSection}>
            <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
              <LottieView
                source={require('../assets/animations/like.json')}
                progress={animationProgress}
                loop={false}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <Text style={styles.likesCount}>{likesQ}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <PostCard
      key={item.id}
      id={item.id}
      title={item.title}
      body={item.body}
      firstName={item.firstName}
      lastName={item.lastName}
      createdAt={item.createdAt}
      liked={item.liked}
      likesQ={item.likesQ}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginVertical: 50,
    backgroundColor: '#f0f0f0',
  },
  postCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: 'grey',
  },
  postDate: {
    fontSize: 14,
    color: 'grey',
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postBody: {
    fontSize: 16,
    marginVertical: 5,
  },
  likesCount: {
    fontSize: 14,
    marginRight: 10,
  },
  likeButton: {
    // Estilos para el botón si es necesario
  },
});

export default Home;
